import { withSessionApiRoute } from '@/core/utils/session';
import { sendSurvey } from '@/lib/re/surveyoverview';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { token } = req.session;
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to make this request.',
    });
  }

  const { survey_id } = req.query;
  const { participantIds } = req.body;

  const sendSurveyResult = await sendSurvey({
    surveyId: survey_id,
    participantIds,
  });

  if (!sendSurveyResult.success) {
    return res.status(500).json({
      success: false,
      message: 'Failed to send survey. Please try again!',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'The survey is created and participants are updated.',
  });
}

export default withSessionApiRoute(handler);
