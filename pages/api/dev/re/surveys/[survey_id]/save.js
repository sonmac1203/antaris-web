import { withSessionApiRoute, jwtUtils } from '@/core/utils';
import Survey from '@/core/models/Survey';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }
  const { survey_id } = req.query;
  const {
    surveyQuestions,
    surveyData: { surveyName, surveyDisplayName, surveyDescription },
  } = req.body;

  const { token } = req.session;
  const { projectId } = jwtUtils.decode(token);

  try {
    await Survey.findOneAndUpdate(
      { mdh_id: survey_id },
      {
        $set: {
          project_id: projectId,
          mdh_id: survey_id,
          name: surveyName,
          display_name: surveyDisplayName,
          description: surveyDescription,
          content: {
            imported_at: new Date(),
            questions: surveyQuestions,
          },
        },
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: 'The survey is saved.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'There was an error. Please try again',
      error: error.message,
    });
  }
}

export default withSessionApiRoute(handler);
