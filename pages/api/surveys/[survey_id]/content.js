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
          message: 'The survey content was found!',
          data: existingSurvey.content,
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'No content found. Please try again!',
        });
      }
    } else {
      const existingContent = await mongoClient
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
        existingContent &&
        existingContent.length > 0 &&
        existingContent[0].content.length > 0
      ) {
        return res.status(201).json({
          success: true,
          message: 'The survey content was found!',
          data: existingContent[0].content,
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'No content found. Please try again!',
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
