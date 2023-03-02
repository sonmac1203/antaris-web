import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import querystring from 'querystring';

const fs = require('fs');

const baseApiUri = process.env.BASE_MDH_API_URI;

export default async function handler(req, res) {
  const audienceString = `${baseApiUri}/identityserver/connect/token`;

  const { serviceAccountId } = req.query;

  // Read the private key from a file
  const privateKey = fs.readFileSync('core/utils/mdh/private_key.pem');

  // Define the assertion object
  const assertion = {
    iss: serviceAccountId,
    sub: serviceAccountId,
    aud: audienceString,
    exp: Math.floor(new Date().getTime() / 1000) + 200,
    jti: uuidv4(),
  };

  var signedAssertion;
  try {
    signedAssertion = jwt.sign(assertion, privateKey, { algorithm: 'RS256' });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error signing JWT. Check your private key. Error: ${err}`,
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
      message: `There is no access token`,
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Access token has been retrieved.',
    accessToken: tokenResponse.access_token,
  });
}

const makeAccessTokenRequest = async (payload) => {
  try {
    const { data } = await axios.post(
      `${baseApiUri}/identityserver/connect/token`,
      querystring.stringify(payload)
    );
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
