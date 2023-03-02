import mongoClientPromise from '@/core/db/mongoClient';
import jwt from 'jwt-simple';

const secret = 'antarissecret';

const handler = async (req, res) => {
  const mongoClient = await mongoClientPromise;

  if (!req.headers['x-auth']) {
    res.status(401).json({ success: false, message: 'Missing X-Auth header' });
    return;
  }

  const token = req.headers['x-auth'];
  const { mdh_id } = jwt.decode(token, secret);

  try {
    const accountData = await mongoClient
      .db()
      .collection('ServiceAccounts')
      .findOne(
        {
          mdh_id: mdh_id,
        },
        { projection: { _id: 0 } }
      );

    res.status(201).json({
      success: true,
      accountData: accountData,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'Internal server error',
      error: err,
    });
  }
};

export default handler;
