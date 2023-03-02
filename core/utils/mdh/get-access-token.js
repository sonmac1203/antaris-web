import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import querystring from 'querystring';

const baseApiUri = process.env.BASE_MDH_API_URI;

export async function getAccessToken(rksServiceAccount, privateKey) {
  const audienceString = `${baseApiUri}/identityserver/connect/token`;
  const assertion = {
    iss: rksServiceAccount,
    sub: rksServiceAccount,
    aud: audienceString,
    exp: Math.floor(new Date().getTime() / 1000) + 200,
    jti: uuidv4(),
  };

  var signedAssertion;
  try {
    signedAssertion = jwt.sign(assertion, privateKey, { algorithm: 'RS256' });
  } catch (err) {
    console.log(`Error signing JWT. Check your private key. Error: ${err}`);
    return null;
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
    return null;
  }
  return tokenResponse.access_token;
}

async function makeAccessTokenRequest(payload) {
  await axios
    .post(
      `${baseApiUri}/identityserver/connect/token`,
      querystring.stringify(payload)
    )
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return null;
    });
}
