import Participant from '@/core/models/Participant';

export async function fetchLinkedParticipants(email) {
  try {
    const existingParticipants = Participant.find(
      { amazon_email: email },
      'participant_identifier project_id'
    );
    return existingParticipants;
  } catch {
    return null;
  }
}
