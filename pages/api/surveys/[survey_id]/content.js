import mongoClientPromise from '@/core/db/mongoClient';

const handler = async (req, res) => {
  const mongoClient = await mongoClientPromise;
  const {
    survey_id,
    project_id,
    participant_identifier,
    step_identifier: identifier,
    status,
  } = req.query;

  const query = {
    survey_id,
    project_id,
    participant_identifier,
  };

  const filterConditions = {};
  if (identifier) {
    filterConditions['identifier'] = identifier;
  }
  if (status) {
    filterConditions['status'] = status;
  }

  try {
    if (Object.keys(req.query).length === 3) {
      const existingSurvey = await mongoClient
        .db()
        .collection('Surveys')
        .findOne(query, { projection: { _id: 0, content: 1 } });

      if (existingSurvey && existingSurvey.content.length > 0) {
        return res.status(201).json({
          success: true,
          message: 'The responses have been found.',
          data: existingSurvey.content,
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
              content: {
                $filter: {
                  input: '$content',
                  as: 'item',
                  cond: {
                    $and: Object.keys(filterConditions).map((key) => ({
                      $eq: ['$$item.' + key, filterConditions[key]],
                    })),
                  },
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
        existingResponses[0].content.length > 0
      ) {
        return res.status(201).json({
          success: true,
          message: 'The responses have been found.',
          data: existingResponses[0].content,
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
