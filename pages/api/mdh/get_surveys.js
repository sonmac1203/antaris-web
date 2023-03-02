import axios from 'axios';

const baseApiUri = process.env.BASE_MDH_API_URI;

export default async function handler(req, res) {
  const { projectId } = req.query;
  const accessToken = req.headers.authorization.split(' ')[1];

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  try {
    const { data } = await axios.get(
      `${baseApiUri}/api/v1/administration/projects/${projectId}/surveytasks`,
      { headers }
    );
    return res.status(200).json({
      success: true,
      message: 'Surveys have been fetched.',
      surveyTasks: data.surveyTasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'There was an error. We cannot fetch survey data.',
      error: error.message,
    });
  }
}
