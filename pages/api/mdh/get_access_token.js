import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import querystring from 'querystring';
import mongoClientPromise from '@/core/db/mongoClient';
const fs = require('fs');

const baseApiUri = process.env.BASE_MDH_API_URI;
const privateKeyPath = 'core/utils/mdh/private_key.pem';

export default async function handler(req, res) {
  // Initialize mongo client
  const mongoClient = await mongoClientPromise;

  // Construct the audience string
  const audienceString = `${baseApiUri}/identityserver/connect/token`;

  // Get the service account ID and project ID from the request query parameters
  const { serviceAccountId, projectId } = req.query;

  try {
    // Find the service account from the database and update the last accessed time
    const { value: existingServiceAccount } = await mongoClient
      .db()
      .collection('ServiceAccounts')
      .findOneAndUpdate(
        { mdh_id: serviceAccountId, project_id: projectId },
        { $set: { last_accessed: new Date() } }
      );

    // Check if the service account exists and the access token is still valid
    if (existingServiceAccount) {
      const { access_token, token_expires_at } = existingServiceAccount;
      const now = new Date();
      if (now < token_expires_at) {
        // Return the existing access token if it is still valid
        return res.status(200).json({
          success: true,
          message: 'Access token has been retrieved from database.',
          token_data: {
            access_token: access_token,
            token_expires_at: token_expires_at,
          },
        });
      }
    }

    // Read the private key from a file
    const privateKey = fs.readFileSync(privateKeyPath);

    // Define the assertion object
    const assertion = {
      iss: serviceAccountId,
      sub: serviceAccountId,
      aud: audienceString,
      exp: Math.floor(new Date().getTime() / 1000) + 200,
      jti: uuidv4(),
    };

    // Sign the jwt using the private key
    var signedAssertion;
    try {
      signedAssertion = jwt.sign(assertion, privateKey, {
        algorithm: 'RS256',
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'There has been an error. Please try again!',
      });
    }

    // Construct the payload for the access token request
    const payload = {
      scope: 'api',
      grant_type: 'client_credentials',
      client_assertion_type:
        'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion: signedAssertion,
    };

    // Make the access token request
    const tokenResponse = await makeAccessTokenRequest(payload);

    // Return an error response if the access token request fails
    if (!tokenResponse || !tokenResponse.access_token) {
      return res.status(500).json({
        success: false,
        message: 'There was an error. Please check your information again!',
      });
    }

    // Calculate the token expiration time
    const tokenExpiresAt = new Date(
      new Date().getTime() + tokenResponse.expires_in * 1000
    );

    // Insert the service account in the database with the new access token and expiration time
    if (existingServiceAccount) {
      await mongoClient
        .db()
        .collection('ServiceAccounts')
        .updateOne(
          { project_id: projectId, mdh_id: serviceAccountId },
          {
            $set: {
              access_token: tokenResponse.access_token,
              token_expires_at: tokenExpiresAt,
            },
          }
        );
    } else {
      await mongoClient.db().collection('ServiceAccounts').insertOne({
        project_id: projectId,
        mdh_id: serviceAccountId,
        access_token: tokenResponse.access_token,
        last_accessed: new Date(),
        token_expires_at: tokenExpiresAt,
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Access token has been retrieved and stored.',
      token_data: {
        access_token: tokenResponse.access_token,
        token_expires_at: tokenExpiresAt,
      },
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message:
        'An error happened while retrieving the token. Please try again!',
    });
  }
}

const makeAccessTokenRequest = async (payload) => {
  try {
    const { data } = await axios.post(
      `${baseApiUri}/identityserver/connect/token`,
      querystring.stringify(payload)
    );
    return data;
  } catch (err) {
    return null;
  }
};
