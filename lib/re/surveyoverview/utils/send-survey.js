import Survey from '@/core/models/Survey';
import Participant from '@/core/models/Participant';

export async function sendSurvey({ surveyId: survey_id, participants: data }) {
  const participantIds = data.map((p) => p.participantIdentifier);

  const participantDataMap = data.reduce(
    (
      map,
      {
        participantIdentifier,
        secondaryIdentifier,
        participantFirstName,
        participantLastName,
      }
    ) => {
      map[participantIdentifier] = {
        firstName: participantFirstName,
        lastName: participantLastName,
        secondaryIdentifier,
      };
      return map;
    },
    {}
  );

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
        const { participant_identifier } = participant;
        const { firstName, lastName, secondaryIdentifier } =
          participantDataMap[participant_identifier];

        participant.alexa_metadata.assigned_surveys.push({
          survey: existingSurvey._id,
          assigned_at: new Date(),
        });
        participant.secondary_identifier = secondaryIdentifier;
        participant.demographics.first_name = firstName;
        participant.demographics.last_name = lastName;
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
