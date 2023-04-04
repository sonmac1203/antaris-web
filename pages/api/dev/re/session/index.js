import { withSessionApiRoute, jwtUtils } from '@/core/utils';

function handler(req, res) {
  const { token: internalToken, role } = req.session;
  const { token: externalToken } = req.query;
  const token = externalToken || internalToken;

  if (!token) {
    return res.status(200).json({
      success: false,
      message: 'Not authorized.',
    });
  }
  try {
    const payload = jwtUtils.decode(token);
    return res.status(200).json({
      success: true,
      message: 'Token and payload were found.',
      data: payload,
      role,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
}

export default withSessionApiRoute(handler);
