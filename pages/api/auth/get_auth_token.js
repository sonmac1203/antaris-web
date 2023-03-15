import jwt from 'jwt-simple';

const secret = process.env.JWT_SECRET;

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const itemToEncode = req.body;

  try {
    const authToken = jwt.encode(itemToEncode, secret);
    return res.status(200).json({
      success: true,
      message: 'Auth token was retrieved.',
      data: {
        authToken,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Auth token failed. Please try again',
    });
  }
};

export default handler;
