import mongoClientPromise from '@/core/db/mongoClient';

const handler = async (req, res) => {
  const responseId = req.query['response-id'];
  const queriedFields = req.query.fields.split(',');
  const dataProjection = {};
  for (const field of queriedFields) {
    dataProjection[field] = 1;
  }

  const mongoClient = await mongoClientPromise;

  try {
    const responseData = await mongoClient
      .db()
      .collection('responses')
      .findOne(
        {
          antaris_id: responseId,
        },
        { projection: { _id: 0, ...dataProjection } }
      );

    if (!responseData) {
      res.status(404).send({
        success: false,
        message: 'Response not found. Please try again!',
        data: {},
      });
      return;
    }
    res.status(201).json({
      success: true,
      message: 'The response has been found.',
      data: responseData,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
};

export default handler;
