import { withSessionApiRoute, jwtUtils } from '@/core/utils';

function handler(req, res) {
  const { token: internalToken } = req.session;
  const { token: externalToken } = req.query;
  const token = externalToken || internalToken;
  try {
    const payload = jwtUtils.decode(token);
    return res.status(200).json({
      success: true,
      message: 'Token and payload were found.',
      data: payload,
    });
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized.',
    });
  }
}

export default withSessionApiRoute(handler);