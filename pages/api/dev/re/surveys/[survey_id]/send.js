import { withSessionApiRoute } from '@/core/utils/session';
import Survey from '@/core/models/Survey';
import Participant from '@/core/models/Participant';

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

  try {
    const existingSurvey = await Survey.findOne({ mdh_id: survey_id });
    const participants = await Participant.find({
      participant_identifier: { $in: participantIds },
    });

    existingSurvey.assigned_to.push(
      ...participants.map((p) => ({ participant: p._id }))
    );

    const promisesToUpdateParticipants = participants.map(
      async (participant) => {
        participant.alexa_metadata.assigned_surveys.push({
          survey: existingSurvey._id,
          assigned_at: new Date(),
        });
        await participant.save();
      }
    );
    await existingSurvey.save();
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
