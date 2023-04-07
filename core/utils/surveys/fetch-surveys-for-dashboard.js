import { getServiceSurveyRoute, commonHeaders } from '../mdh/config';
import { groupSurveyById } from './group-survey-by-id';
import Survey from '@/core/models/Survey';
import axios from 'axios';

export async function fetchSurveysForDashboard(props) {
  const { accessToken, projectId, params } = props;

  const config = {
    headers: commonHeaders.json(accessToken),
    ...(params && { params }),
  };
  const route = getServiceSurveyRoute(projectId);

  try {
    const { data } = await axios.get(route, config);
    const groupedSurveys = groupSurveyById(data.surveyTasks);
    const promises = groupedSurveys.map(async (survey) => {
      const existingSurvey = await Survey.findOne(
        { mdh_id: survey.surveyID },
        'content alexa_completed assigned_to'
      );
      if (existingSurvey) {
        survey.alexa_completed = existingSurvey.alexa_completed;
        survey.content = existingSurvey.content;
        survey.assigned_to = existingSurvey.assigned_to;
      }
      return survey;
    });
    const updatedSurveys = await Promise.all(promises);
    return updatedSurveys;
  } catch (err) {
    return null;
  }
}
