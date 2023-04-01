import { getServiceParticipantRoute, commonHeaders } from './config';
import Participant from '@/core/models/Participant';
import axios from 'axios';

export async function fetchMdhOneParticipant(props) {
  const { accessToken, projectId, participantIdentifier } = props;

  const config = {
    headers: commonHeaders.json(accessToken),
  };
  const route = getServiceParticipantRoute(projectId, participantIdentifier);
  const { data: participant } = await axios.get(route, config);

  const existingParticipant = await Participant.findOne(
    { participant_identifier: participant.participantIdentifier },
    'alexa_metadata'
  ).populate({
    path: 'alexa_metadata.assigned_surveys.survey',
    select: 'mdh_id',
  });

  if (existingParticipant) {
    return {
      ...participant,
      alexa_metadata: existingParticipant.alexa_metadata,
    };
  }
  return participant;
}
