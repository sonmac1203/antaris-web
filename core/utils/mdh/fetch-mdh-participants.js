import { getServiceParticipantRoute, commonHeaders } from './config';
import Participant from '@/core/models/Participant';
import axios from 'axios';

export async function fetchMdhParticipants(props) {
  const { accessToken, projectId } = props;
  const config = {
    headers: commonHeaders.json(accessToken),
  };
  const route = getServiceParticipantRoute(projectId, null);
  const { data } = await axios.get(route, config);

  const promises = data.participants.map(async (participant) => {
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
}
