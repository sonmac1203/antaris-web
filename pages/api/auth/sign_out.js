import { withSessionApiRoute } from '@/core/utils/session';

const handler = async (req, res) => {
  req.session.destroy();
  await req.session.save();

  res.redirect('/participants');
};

export default withSessionApiRoute(handler);
