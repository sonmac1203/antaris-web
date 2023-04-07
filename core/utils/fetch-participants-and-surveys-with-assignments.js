import Participant from '@/core/models/Participant';
import Survey from '@/core/models/Survey';

export async function fetchParticipantsAndSurveysWithAssignments() {
  try {
    const participants = await Participant.find(
      {
        'alexa_metadata.assigned_surveys': {
          $exists: true,
          $not: { $size: 0 },
        },
      },
      'participant_identifier secondary_identifier demographics'
    );

    const surveys = await Survey.find(
      {
        assigned_to: { $exists: true, $not: { $size: 0 } },
      },
      'mdh_id display_name name'
    );

    return { participants, surveys };
  } catch (error) {
    return null;
  }
}
