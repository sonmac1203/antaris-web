import mongoClientPromise from '@/core/db/mongoClient';

const handler = async (req, res) => {
  const mongoClient = await mongoClientPromise;
  const {
    survey_id,
    project_id,
    participant_identifier,
    step_identifier: identifier,
  } = req.query;

  const query = {
    survey_id,
    project_id,
    participant_identifier,
  };

  try {
    if (!identifier) {
      const existingSurvey = await mongoClient
        .db()
        .collection('Surveys')
        .findOne(query, { projection: { _id: 0, answers: 1 } });

      if (existingSurvey && existingSurvey.answers.length > 0) {
        return res.status(201).json({
          success: true,
          message: 'The responses have been found.',
          data: existingSurvey.answers,
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'No responses found. Please try again!',
        });
      }
    } else {
      const existingResponses = await mongoClient
        .db()
        .collection('Surveys')
        .aggregate([
          { $match: query },
          {
            $project: {
              answers: {
                $filter: {
                  input: '$answers',
                  as: 'item',
                  cond: { $eq: ['$$item.identifier', identifier] },
                },
              },
              _id: 0,
            },
          },
        ])
        .toArray();

      if (
        existingResponses &&
        existingResponses.length > 0 &&
        existingResponses[0].answers.length > 0
      ) {
        return res.status(201).json({
          success: true,
          message: 'The responses have been found.',
          data: existingResponses[0].answers,
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'No responses found. Please try again!',
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
};

export default handler;
