const AMAZON_LOGIN_URL = 'https://www.amazon.com/ap/oa';
const AMAZON_API_URL = 'https://api.amazon.com';
const AMAZON_ALEXA_URL = 'https://api.amazonalexa.com';

export const skillId = process.env.SKILL_ID;
export const lwaClientId = process.env.LWA_CLIENT_ID;
export const lwaClientSecret = process.env.LWA_CLIENT_SECRET;
export const alexaClientId = process.env.ALEXA_CLIENT_ID;
export const alexaClientSecret = process.env.ALEXA_CLIENT_SECRET;

export const getRedirectUri = (type) => {
  return process.env.HOST + `/api/amazon/connect/${type}_redirect`;
  // return process.env.HOST + '/participants';
};

export const getLoginRoute = (clientId, scope, redirectUri, state) => {
  const url = new URL(AMAZON_LOGIN_URL);
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('scope', scope);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('redirect_uri', redirectUri);
  if (state) {
    url.searchParams.set('state', state);
  }
  return url.toString();
};

export const getAccessTokenRoute = () => AMAZON_API_URL + '/auth/o2/token';

export const getProfileRoute = () => AMAZON_API_URL + '/user/profile';

export const getSkillEnablementRoute = (skillId) =>
  AMAZON_ALEXA_URL + `/v1/users/~current/skills/${skillId}/enablement`;

export const getSendEventRoute = () =>
  AMAZON_ALEXA_URL + '/v1/proactiveEvents/stages/development';

export const commonHeaders = {
  formUrlEncoded: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  json: (accessToken) => ({
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  }),
};
