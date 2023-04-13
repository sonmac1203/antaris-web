import { jwtUtils, withSessionApiRoute } from '@/core/utils';
import { deleteSkill } from '@/lib/pa/amazon';

const authTokenFromInside = process.env.API_SECRET;

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const { token } = req.session;

  const authTokenFromOutside =
    req.headers?.authorization?.split(' ')[1] ?? null;

  if (!token && !authTokenFromOutside) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to make this request.',
    });
  }

  if (authTokenFromOutside && authTokenFromOutside !== authTokenFromInside) {
    return res.status(403).json({
      success: false,
      message: 'Auth token does not match. Please try again!',
    });
  }

  // const { access_token: accessToken } = jwtUtils.decode(token);

  const accessToken = '12345';
  const result = await deleteSkill(accessToken);

  if (result.status !== 202 && result.status !== 200) {
    return res.status(404).json({
      success: false,
      message: 'Could not delete skill.',
    });
  }
  return res.status(200).json({
    success: true,
    message: 'Unlinked and deleted skill.',
  });
};

export default withSessionApiRoute(handler);
