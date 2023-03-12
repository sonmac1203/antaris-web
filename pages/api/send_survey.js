import mongoClientPromise from '@/core/db/mongoClient';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  const mongoClient = await mongoClientPromise;

  const surveyData = req.body;

  const {
    project_id,
    survey_id,
    participant_identifier,
    secondary_identifier,
    survey_name,
    survey_display_name,
    survey_description,
    status,
    due_date,
    content,
  } = surveyData;

  const query = {
    survey_id: survey_id,
    project_id: project_id,
    participant_identifier: participant_identifier,
  };

  try {
    const existingSurvey = await mongoClient
      .db()
      .collection('Surveys')
      .findOne(query);
    if (existingSurvey) {
    } else {
      await mongoClient.db().collection('Surveys').insertOne(surveyData);
      await mongoClient
        .db()
        .collection('Participants')
        .updateOne(
          {
            participant_identifier: participant_identifier,
            project_id: project_id,
          },
          {
            $push: {
              alexa_surveys: {
                survey_id: survey_id,
                survey_name: survey_name,
                survey_display_name: survey_display_name,
                assigned_at: new Date(),
              },
            },
          }
        );
      res.status(200).send({
        success: true,
        message: 'The study has been saved!',
      });
    }
  } catch (err) {
    res.status(400).send({
      success: false,
      message: 'An error happened while saving the study. Please try again!',
      error: err,
    });
  }
};

export default handler;
