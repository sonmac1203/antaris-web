import { withSessionApiRoute } from '@/core/utils/session';

const handler = async (req, res) => {
  req.session.destroy();
  await req.session.save();

  res.redirect('/');
};

export default withSessionApiRoute(handler);
