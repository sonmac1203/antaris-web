import { MyDataHelpsClient } from '@/lib/re/mydatahelps/modules';
import Participant from '@/core/models/Participant';

export async function getAllParticipants(props) {
  const { accessToken, projectId } = props;

  const mdhClient = new MyDataHelpsClient({
    projectId,
  });

  const result = await mdhClient.getParticipants(accessToken, null);

  if (!result) return null;

  const { participants: participantsFromMdh } = result;

  try {
    const promises = participantsFromMdh.map(async (participant) => {
      const existingParticipant = await Participant.findOne(
        { participant_identifier: participant.participantIdentifier },
        'alexa_metadata'
      );
      if (existingParticipant) {
        participant.alexa_metadata = existingParticipant.alexa_metadata;
      }
      return participant;
    });
    const updatedParticipants = await Promise.all(promises);
    return updatedParticipants;
  } catch (err) {
    return null;
  }
}
