import mongoClientPromise from '@/core/db/mongoClient';

const handler = async (req, res) => {
  const { fields } = req.query;
  const queriedFields = fields.split(',');
  const dataProjection = {};
  for (const field of queriedFields) {
    dataProjection[field] = 1;
  }
  const mongoClient = await mongoClientPromise;
  try {
    const data = await mongoClient
      .db()
      .collection('participants')
      .find({}, { projection: { _id: 0, ...dataProjection } })
      .toArray();

    if (!data) {
      res.status(404).send({
        success: false,
        message: 'No participant has been recorded in the database.!',
        participants_data: [],
      });
      return;
    }
    res.status(201).json({
      success: true,
      message: 'A list of participants has been found',
      participants_data: data,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
};

export default handler;
