import Participant from '@/core/models/Participant';

export async function getParticipantsWithAssignments() {
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
    return { participants };
  } catch {
    return null;
  }
}
