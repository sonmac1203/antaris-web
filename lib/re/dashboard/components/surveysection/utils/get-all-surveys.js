import Survey from '@/core/models/Survey';
import { groupSurveyById } from '@/core/utils';
import { MyDataHelpsClient } from '@/lib/re/mydatahelps/modules';

export async function getAllSurveys(props) {
  const { accessToken, projectId } = props;

  const mdhClient = new MyDataHelpsClient({
    projectId,
  });

  const result = await mdhClient.getSurveys({ accessToken });

  if (!result) return null;

  const { surveyTasks: surveysFromMdh } = result;

  try {
    const groupedSurveys = groupSurveyById(surveysFromMdh);
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
  } catch {
    return null;
  }
}
