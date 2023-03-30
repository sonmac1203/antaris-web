import { withSessionApiRoute } from '@/core/utils/session';

const handler = async (req, res) => {
  req.session.destroy();
  await req.session.save();
  res.status(307).redirect('/');
};

export default withSessionApiRoute(handler);
