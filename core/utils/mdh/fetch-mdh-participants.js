import axios from 'axios';
import { getServiceParticipantRoute, commonHeaders } from './config';

export async function fetchMdhParticipants(props) {
  const { accessToken, projectId, params } = props;
  const config = {
    headers: commonHeaders.json(accessToken),
  };
  const route = getServiceParticipantRoute(
    projectId,
    params ? params.participantId : null
  );
  const { data } = await axios.get(route, config);
  return data;
}
