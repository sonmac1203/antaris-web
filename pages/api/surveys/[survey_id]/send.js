import { withSessionApiRoute } from '@/core/utils/session';
import jwtUtils from '@/core/utils/jwt-utils';
import Survey from '@/core/models/Survey';
import Participant from '@/core/models/Participant';
import { Types } from 'mongoose';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { survey_id } = req.query;
  const {
    participantIds,
    surveyContent,
    surveyData: { surveyName, surveyDisplayName, surveyDescription },
  } = req.body;

  const { token } = req.session;
  const { projectId } = jwtUtils.decode(token);

  try {
    const participants = await Participant.find({
      participant_identifier: { $in: participantIds },
    });
    const newSurvey = await Survey.create({
      _id: new Types.ObjectId(),
      project_id: projectId,
      mdh_id: survey_id,
      name: surveyName,
      display_name: surveyDisplayName,
      description: surveyDescription,
      content: surveyContent,
      assigned_to: participants.map((p) => ({
        participant: p._id,
      })),
    });

    const promisesToUpdateParticipants = participants.map(
      async (participant) => {
        participant.alexa_metadata.assigned_surveys.push({
          survey: newSurvey._id,
        });
        await participant.save();
      }
    );

    await Promise.all(promisesToUpdateParticipants);

    return res.status(200).json({
      success: true,
      message: 'The survey is created and participants are updated.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'There was an error. We cannot fetch survey data.',
      error: error.message,
    });
  }
}

export default withSessionApiRoute(handler);
