import { jwtUtils, withSessionApiRoute } from '@/core/utils';
import { getAllParticipants } from '@/lib/re/dashboard';

async function handler(req, res) {
  const { projectId: projectIdFromRequest } = req.query;
  const sessionToken = req.session?.token;
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
  };

  try {
    const data = await getAllParticipants(query);

    return res.status(200).json({
      success: true,
      message: 'Participants have been fetched.',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'There was an error. We cannot fetch participant data.',
      error: error.message,
    });
  }
}

export default withSessionApiRoute(handler);
