import axios from 'axios';
import {
  getLoginRoute,
  getAccessTokenRoute,
  getProfileRoute,
  getSendEventRoute,
  getSkillEnablementRoute,
  commonHeaders,
} from './config';

class AmazonService {
  #handleRequest = async (request) => {
    try {
      const response = await request();
      return response.data;
    } catch (error) {
      console.error(`Error: ${error}`);
      return error.response.data;
    }
  };

  constructor(clientId, clientSecret, redirectUri, skillId) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.skillId = skillId;
  }

  async login(req, scope) {
    const loginURL = getLoginRoute(this.clientId, scope, this.redirectUri);
    req.redirect(loginURL);
  }

  async getAccessToken(authCode, grantType) {
    const config = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };

    const data = {
      grant_type: grantType,
      code: authCode,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      redirect_uri: this.redirectUri,
    };

    const route = getAccessTokenRoute();
    const apiResponse = await this.#handleRequest(() =>
      axios.post(route, new URLSearchParams(data), config)
    );
    return apiResponse;
  }

  async refreshAccessToken(refreshToken) {
    const config = {
      headers: commonHeaders.formUrlEncoded,
    };
    const data = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      redirect_uri: this.redirectUri,
    };
    const route = getAccessTokenRoute();
    const apiResponse = await this.#handleRequest(() =>
      axios.post(route, new URLSearchParams(data), config)
    );
    return apiResponse;
  }

  async getUserProfile(accessToken) {
    const config = {
      params: {
        access_token: accessToken,
      },
    };
    const route = getProfileRoute();
    const apiResponse = await this.#handleRequest(() =>
      axios.get(route, config)
    );
    return apiResponse;
  }

  async enableAlexaSkill(authCode, accessToken) {
    const config = {
      headers: commonHeaders.json(accessToken),
    };
    const body = {
      stage: 'development',
      accountLinkRequest: {
        redirectUri: this.redirectUri,
        authCode: authCode,
        type: 'AUTH_CODE',
      },
    };
    const route = getSkillEnablementRoute(this.skillId);
    const apiResponse = await this.#handleRequest(() =>
      axios.post(route, body, config)
    );
    return apiResponse;
  }

  async getSkillAndAccountStatus(accessToken) {
    const config = {
      headers: commonHeaders.json(accessToken),
    };
    const route = getSkillEnablementRoute(this.skillId);
    const apiResponse = await this.#handleRequest(() =>
      axios.post(route, config)
    );
    return apiResponse;
  }

  async deleteSkillAndUnlinkAccount(accessToken) {
    const config = {
      headers: commonHeaders.json(accessToken),
    };
    const route = getSkillEnablementRoute(this.skillId);
    const apiResponse = await this.#handleRequest(() =>
      axios.delete(route, config)
    );
    return apiResponse;
  }

  async sendProactiveEvent(accessToken, userId) {
    const config = {
      headers: commonHeaders.json(accessToken),
    };

    const timestamp = new Date();
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getHours() + 24);
    const referenceId = 'AntarisNotification' + new Date().getTime();

    const bodyData = {
      timestamp: timestamp,
      referenceId: referenceId,
      expiryTime: expiryTime,
      event: {
        name: 'AMAZON.MessageAlert.Activated',
        payload: {
          state: {
            status: 'UNREAD',
            freshness: 'NEW',
          },
          messageGroup: {
            creator: {
              name: 'Son Mac',
            },
            count: 5,
          },
        },
      },
      localizedAttributes: [
        {
          locale: 'en-US',
          sellerName: 'Example Corp.',
        },
      ],
      relevantAudience: {
        type: 'Unicast',
        payload: {
          user: userId,
        },
      },
    };
    const route = getSendEventRoute();
    const apiResponse = this.#handleRequest(() =>
      axios.post(route, bodyData, config)
    );
    return apiResponse;
  }
}

module.exports = AmazonService;
