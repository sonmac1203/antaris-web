import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import querystring from 'querystring';
import mongoClientPromise from '@/core/db/mongoClient';
const fs = require('fs');

const baseApiUri = process.env.BASE_MDH_API_URI;
const privateKeyPath = 'core/utils/mdh/private_key.pem';

export default async function handler(req, res) {
  const audienceString = `${baseApiUri}/identityserver/connect/token`;

  const { serviceAccountId, projectId } = req.query;

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

  // Sign the jwt
  var signedAssertion;
  try {
    signedAssertion = jwt.sign(assertion, privateKey, { algorithm: 'RS256' });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'There has been an error. Please try again!',
    });
  }

  const payload = {
    scope: 'api',
    grant_type: 'client_credentials',
    client_assertion_type:
      'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion: signedAssertion,
  };

  const tokenResponse = await makeAccessTokenRequest(payload);

  if (!tokenResponse || !tokenResponse.access_token) {
    return res.status(500).json({
      success: false,
      message: 'There was an error. Please check your information again!',
    });
  }

  try {
    const mongoClient = await mongoClientPromise;
    mongoClient.db().collection('ServiceAccounts').insertOne({
      project_id: projectId,
      mdh_id: serviceAccountId,
      access_token: tokenResponse.access_token,
      last_accessed: new Date(),
      token_granted_at: new Date(),
      token_expires_in: tokenResponse.expires_in,
    });
    return res.status(200).json({
      success: true,
      message: 'Access token has been retrieved and stored.',
      token_data: tokenResponse,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: 'An error happened while saving the token. Please try again!',
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
