import { createAmazonService } from '@/lib/pa/amazon';
import { withSessionApiRoute, jwtUtils } from '@/core/utils';

const handler = async (req, res) => {
  // Extract code and state from query
  const { code, state: stateString } = req.query;

  // Parse state into json
  const state = JSON.parse(decodeURIComponent(stateString));

  // If the login request requires chaining, trigger Alexa login
  if (state.chaining) {
    await triggerAlexaLogin(res, code, state);
    return;
  }

  // If the login request does not require chaining
  const amazonService = createAmazonService('lwa');

  // Get access token from auth code
  const result = await amazonService.getAccessToken(code, 'authorization_code');

  // If the request failed
  if (result.hasOwnProperty('error')) {
    res.redirect('/participants'); // Redirect user back to log in page
    return;
  }

  // Encode the result using the encodeKey and store to session
  const sessionToken = jwtUtils.encode(result);
  req.session.token = sessionToken;
  req.session.role = 'participant';
  await req.session.save();

  res.redirect('/pa/dashboard');
};

const triggerAlexaLogin = async (res, code, state) => {
  const service = createAmazonService('alexa');
  const newState = encodeURIComponent(
    JSON.stringify({ ...state, authCode: code })
  );
  await service.login(res, 'alexa::skills:account_linking', newState);
};

export default withSessionApiRoute(handler);
