import { fetchMdhSurveys } from '@/core/utils/mdh';
import { groupSurveyById, withSessionApiRoute } from '@/core/utils';
import jwtUtils from '@/core/utils/jwt-utils';

async function handler(req, res) {
  const { projectId: projectIdFromRequest, surveyId: surveyID } = req.query;
  const sessionToken = req.session?.researcher_token;
  const accessTokenFromRequest =
    req.headers?.authorization?.split(' ')[1] ?? null;

  if (!accessTokenFromRequest && !sessionToken) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to make the request.',
    });
  }
  const {
    projectId: projectIdFromSession,
    accessToken: accessTokenFromSession,
  } = accessTokenFromRequest ? {} : jwtUtils.decode(sessionToken);

  if (!projectIdFromRequest && !projectIdFromSession) {
    return res.status(404).json({
      success: false,
      message: 'Project id was not found.',
    });
  }

  const query = {
    accessToken: accessTokenFromSession || accessTokenFromRequest,
    projectId: projectIdFromSession || projectIdFromRequest,
    ...(surveyID && { params: { surveyID } }),
  };

  try {
    const data = await fetchMdhSurveys(query);
    const surveys = groupSurveyById(data.surveyTasks);
    return res.status(200).json({
      success: true,
      message: 'Surveys have been fetched.',
      data: surveys,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'There was an error. We cannot fetch survey data.',
      error: error.message,
    });
  }
}

export default withSessionApiRoute(handler);
