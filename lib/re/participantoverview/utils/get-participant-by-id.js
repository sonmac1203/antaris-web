import { MyDataHelpsClient } from '../../mydatahelps/modules';
import Participant from '@/core/models/Participant';

export async function getParticipantById(props) {
  const { accessToken, projectId, participantIdentifier } = props;

  const mdhClient = new MyDataHelpsClient({
    projectId,
  });

  const participantFromMdh = await mdhClient.getParticipants(
    accessToken,
    participantIdentifier
  );

  if (!participantFromMdh) return null;

  try {
    const participantFromDb = await Participant.findOne(
      { participant_identifier: participantFromMdh.participantIdentifier },
      'alexa_metadata'
    ).populate({
      path: 'alexa_metadata.assigned_surveys.survey',
      select: 'mdh_id name display_name alexa_completed content',
    });

    if (participantFromDb) {
      return {
        ...participantFromMdh,
        alexa_metadata: participantFromDb.alexa_metadata,
      };
    }
    return participantFromMdh;
  } catch {
    return null;
  }
}
