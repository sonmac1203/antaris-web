import mongoClientPromise from '@/core/db/mongoClient';

const handler = async (req, res) => {
  if (req.method !== 'PUT') {
    res.status(405).send({ message: 'Only PUT requests allowed' });
    return;
  }

  const mongoClient = await mongoClientPromise;
  const {
    survey_id,
    project_id,
    participant_identifier,
    step_identifier: identifier,
  } = req.query;

  const { answer: answerText } = req.body;

  const query = {
    survey_id,
    project_id,
    participant_identifier,
  };

  try {
    const result = await mongoClient
      .db()
      .collection('Surveys')
      .findOneAndUpdate(
        query,
        {
          $push: {
            answers: {
              text: answerText,
              provided_at: new Date(),
              identifier: identifier,
            },
          },
          $set: {
            alexa_status: {
              $cond: [
                {
                  $eq: [
                    {
                      $size: {
                        $filter: {
                          input: '$content',
                          as: 'c',
                          cond: { $eq: ['$$c.status', 'complete'] },
                        },
                      },
                    },
                    { $size: '$content' },
                  ],
                },
                'complete',
                'incomplete',
              ],
            },
          },
        }
        // {
        //   arrayFilters: [{ 'elem.identifier': identifier }],
        // }
      );
    console.log(result);

    res.status(200).send({
      success: true,
      message: 'The answer has been stored!',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
};

export default handler;
