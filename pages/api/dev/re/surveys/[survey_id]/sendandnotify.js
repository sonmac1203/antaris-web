import { createAmazonService } from '@/core/utils/amazon';
import { withSessionApiRoute } from '@/core/utils';
import { sendSurvey } from '@/core/utils';
import Survey from '@/core/models/Survey';
import Participant from '@/core/models/Participant';

const authTokenFromInside = process.env.API_SECRET;

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }
  const { token } = req.session;

  const authTokenFromOutside =
    req.headers?.authorization?.split(' ')[1] ?? null;

  if (!token && !authTokenFromOutside) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to make this request.',
    });
  }

  if (authTokenFromOutside && authTokenFromOutside !== authTokenFromInside) {
    return res.status(403).json({
      success: false,
      message: 'Auth token does not match. Please try again!',
    });
  }

  const { survey_id } = req.query;
  const { participantIds, creatorName: name } = req.body;
  const creatorName = name || 'Antaris';

  try {
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

    const existingSurvey = await Survey.findOne({ mdh_id: survey_id });
    const participants = await Participant.find({
      participant_identifier: { $in: participantIds },
    });
    const amazonService = createAmazonService('alexa');
    const result = await amazonService.getProactiveAccessToken();

    // If the request failed
    if (result.hasOwnProperty('error')) {
      return res.status(500).json({
        success: false,
        message: 'Survey was sent but could not notify the participants.',
      });
    }

    const notificationPromises = participants.map((p) => {
      const userId = p.alexa_metadata.user_id;
      return amazonService.sendProactiveEvent(
        result.access_token,
        userId,
        creatorName
      );
    });

    const notificationPromisesResult = await Promise.all(notificationPromises);

    const failedIndices = notificationPromisesResult.reduce(
      (acc, result, index) => {
        if (result.status !== 202 && result.status !== 200) {
          acc.push(index);
        }
        return acc;
      },
      []
    );

    const successfulParticipantsIds = participantIds.filter((_, index) => {
      return !failedIndices.includes(index);
    });

    await Participant.updateMany(
      {
        participant_identifier: { $in: successfulParticipantsIds },
        'alexa_metadata.assigned_surveys.survey': existingSurvey._id,
        'alexa_metadata.assigned_surveys.completed': false,
        'alexa_metadata.assigned_surveys.notified': false,
      },
      {
        $set: {
          'alexa_metadata.assigned_surveys.$[element].notified': true,
          'alexa_metadata.assigned_surveys.$[element].last_notified':
            new Date(),
        },
      },
      { arrayFilters: [{ 'element.survey': existingSurvey._id }] }
    );

    // Find the survey and update the "assigned_to" array in the survey document
    await Survey.updateOne(
      { mdh_id: survey_id },
      {
        $set: {
          'assigned_to.$[elem].notified': true,
          'assigned_to.$[elem].last_notified': new Date(),
        },
      },
      {
        arrayFilters: [
          {
            'elem.participant': { $in: participants.map((p) => p._id) },
            'elem.completed': false,
            'elem.notified': false,
          },
        ],
      }
    );

    return res.status(200).json({
      success: true,
      message: 'The survey is created and participants are updated.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'There was an error. Try sending the survey again!',
      error: error.message,
    });
  }
}

export default withSessionApiRoute(handler);
