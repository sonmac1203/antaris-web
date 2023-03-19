import jwt from 'jwt-simple';

const secret = process.env.JWT_SECRET;

const handler = async (req, res) => {
  if (!req.headers['x-auth']) {
    res.status(401).json({ success: false, message: 'Missing X-Auth header' });
    return;
  }

  const token = req.headers['x-auth'];
  try {
    const { key } = jwt.decode(token, secret);
    return res.status(200).json({
      success: false,
      message: 'User has been authenticated.',
      data: {
        service_account_id: key,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Invalid auth token',
    });
  }
};

export default handler;
