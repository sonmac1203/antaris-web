import axios from 'axios';
import { getServiceSurveyRoute, commonHeaders } from './config';

export async function fetchMdhSurveys(props) {
  const { accessToken, projectId, params } = props;

  const config = {
    headers: commonHeaders.json(accessToken),
    ...(params && { params }),
  };
  const route = getServiceSurveyRoute(projectId);
  const { data } = await axios.get(route, config);
  return data;
}
