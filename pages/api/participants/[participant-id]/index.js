import mongoClientPromise from '@/core/db/mongoClient';

const handler = async (req, res) => {
  const participantId = req.query['participant-id'];
  const queriedFields = req.query.fields.split(',');
  const dataProjection = {};
  for (const field of queriedFields) {
    dataProjection[field] = 1;
  }

  const mongoClient = await mongoClientPromise;

  try {
    const participantData = await mongoClient
      .db()
      .collection('participants')
      .findOne(
        {
          antaris_id: participantId,
        },
        { projection: { _id: 0, ...dataProjection } }
      );

    if (!participantData) {
      res.status(404).send({
        success: false,
        message: 'Participant not found. Please try again!',
        data: {},
      });
      return;
    }
    res.status(201).json({
      success: true,
      message: 'Participant has been found.',
      data: participantData,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
};

export default handler;
