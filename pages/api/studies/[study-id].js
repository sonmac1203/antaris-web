import mongoClientPromise from '@/core/db/mongoClient';

const handler = async (req, res) => {
  const studyId = req.query['study-id'];
  const queriedFields = req.query.fields.split(',');
  const dataProjection = {};
  for (const field of queriedFields) {
    dataProjection[field] = 1;
  }

  const mongoClient = await mongoClientPromise;

  try {
    const studiesData = await mongoClient
      .db()
      .collection('studies')
      .findOne(
        {
          antaris_id: studyId,
        },
        { projection: { _id: 0, ...dataProjection } }
      );

    if (!studiesData) {
      res.status(404).send({
        success: false,
        message: 'Study not found. Please try again!',
        data: {},
      });
      return;
    }
    res.status(201).json({
      success: true,
      message: 'The study has been found.',
      data: studiesData,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
};

export default handler;
