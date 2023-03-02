import axios from 'axios';
import querystring from 'querystring';

const baseApiUri = process.env.BASE_MDH_API_URI;

export default async function handler(req, res) {
  const { participantId, token } = req.query;

  const payload = {
    scope: 'api',
    grant_type: 'delegated_participant',
    participant_id: participantId,
    client_id: 'RKStudio.DelegatedParticipant',
    client_secret: 'secret',
    token: token,
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
