import jwtUtils from '@/core/utils/jwt-utils';
import { withSessionApiRoute } from '@/core/utils';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  console.log('IM IN LOGIN');
  const itemToEncode = req.body;
  res.redirect('/participants');
  try {
    const authToken = jwtUtils.encode(itemToEncode);
    req.session.researcher_token = authToken;
    await req.session.save();
    console.log('REDIRECTING TO DASH');
    res.redirect('/participants');
  } catch (err) {
    res.redirect('/');
  }
};

export default withSessionApiRoute(handler);
