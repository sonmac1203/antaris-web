import mongoClientPromise from '@/core/db/mongoClient';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  const mongoClient = await mongoClientPromise;
  const { name, idNumber, role } = req.body;

  const collection = role === 'researcher' ? 'researchers' : 'participants';

  try {
    mongoClient.db().collection(collection).insertOne({
      name: name,
      antaris_id: idNumber,
      role: role,
      studies: [],
    });
    res.status(200).send({
      success: true,
      message: 'The user has been created!',
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: 'An error happened while creating the user. Please try again!',
      error: err,
    });
  }
};

export default handler;
