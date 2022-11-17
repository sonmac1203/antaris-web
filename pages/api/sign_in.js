import mongoClientPromise from '@/core/db/mongoClient';
import jwt from 'jwt-simple';

const secret = 'antarissecret';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  const mongoClient = await mongoClientPromise;
  const { idNumber, role } = req.body;

  try {
    const researcherData = await mongoClient
      .db()
      .collection('researchers')
      .findOne(
        {
          antaris_id: idNumber,
        },
        { projection: { _id: 0, antaris_id: 1 } }
      );

    if (!researcherData) {
      res.status(404).send({
        success: false,
        message: 'User not found. Please try again!',
      });
      return;
    }
    const token = jwt.encode({ antaris_id: researcherData.antaris_id }, secret);
    res.status(201).json({
      success: true,
      token: token,
      message: 'Successfully logged in!',
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
};

export default handler;
