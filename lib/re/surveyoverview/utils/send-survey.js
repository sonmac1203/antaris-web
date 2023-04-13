import Survey from '@/core/models/Survey';
import Participant from '@/core/models/Participant';

export async function sendSurvey({ surveyId: survey_id, participantIds }) {
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
    return { success: true };
  } catch (err) {
    return { success: false };
  }
}
