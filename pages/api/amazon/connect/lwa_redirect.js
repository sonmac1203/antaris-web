import { createAmazonService } from '@/core/utils/amazon';
import { withSessionApiRoute } from '@/core/utils';
import jwtUtils from '@/core/utils/jwt-utils';

const handler = async (req, res) => {
  const { code } = req.query;
  const amazonService = createAmazonService('lwa');
  const result = await amazonService.getAccessToken(code, 'authorization_code');

  // if failed
  if (result.hasOwnProperty('error')) {
    res.redirect('/participants'); // Redirect user back to log in page
    return;
  }

  // Encode the result using the encodeKey
  const sessionToken = jwtUtils.encode({ ...result, lwaAuthCode: code });

  req.session.token = sessionToken;
  await req.session.save();
  res.redirect('/participants/connect_alexa');
};

export default withSessionApiRoute(handler);
