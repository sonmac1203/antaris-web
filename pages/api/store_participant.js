import mongoClientPromise from '@/core/db/mongoClient';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  const mongoClient = await mongoClientPromise;

  const participantData = req.body;

  try {
    mongoClient.db().collection('Participants').insertOne(participantData);
    res.status(200).send({
      success: true,
      message: 'The participant has been stored!',
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message:
        'An error happened while storing the participant. Please try again!',
      error: err,
    });
  }
};

export default handler;
