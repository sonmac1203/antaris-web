import mongoClientPromise from '@/core/db/mongoClient';

const handler = async (req, res) => {
  const { survey_id, project_id, participant_identifier, fields } = req.query;
  const query = {
    survey_id,
    project_id,
    participant_identifier,
  };
  const dataProjection = fields
    ? fields.split(',').reduce((acc, field) => {
        acc[field] = 1;
        return acc;
      }, {})
    : {};

  const mongoClient = await mongoClientPromise;

  try {
    const surveyData = await mongoClient
      .db()
      .collection('Surveys')
      .findOne(query, { projection: { _id: 0, ...dataProjection } });

    if (!surveyData) {
      return res.status(404).send({
        success: false,
        message: 'Survey not found. Please try again!',
        data: {},
      });
    }
    return res.status(201).json({
      success: true,
      message: 'The study has been found.',
      data: surveyData,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
};

export default handler;
