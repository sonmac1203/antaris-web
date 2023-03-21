import axios from 'axios';
import { getAuthRoute } from './config';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import querystring from 'querystring';

class MDHService {
  #handleRequest = async (request) => {
    try {
      const response = await request();
      return response.data;
    } catch (error) {
      console.error(`Error: ${error}`);
      return null;
    }
  };

  constructor({ serviceAccountId = '', privateKey = null, projectId = '' }) {
    this.serviceAccountId = serviceAccountId;
    this.privateKey = privateKey;
    this.projectId = projectId;
  }

  async getAccessToken() {
    const audienceString = getAuthRoute();
    const assertion = {
      iss: this.serviceAccountId,
      sub: this.serviceAccountId,
      aud: audienceString,
      exp: Math.floor(new Date().getTime() / 1000) + 200,
      jti: uuidv4(),
    };

    const signedAssertion = jwt.sign(assertion, this.privateKey, {
      algorithm: 'RS256',
    });

    const payload = {
      scope: 'api',
      grant_type: 'client_credentials',
      client_assertion_type:
        'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion: signedAssertion,
    };

    const apiResponse = await this.#handleRequest(() =>
      axios.post(audienceString, querystring.stringify(payload))
    );

    return apiResponse;
  }
}

module.exports = MDHService;
