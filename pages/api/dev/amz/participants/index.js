import { withSessionApiRoute } from '@/core/utils';
import { fetchLinkedParticipants } from '@/core/utils/amazon';

async function handler(req, res) {
  const { token } = req.session;

  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to make the request.',
    });
  }

  const { email } = req.query;

  const participants = await fetchLinkedParticipants(email);

  if (!participants) {
    return res.status(404).json({
      success: false,
      message: 'Could not fetch participants',
    });
  }
  return res.status(200).json({
    success: true,
    message: 'Participants have been fetched.',
    data: participants,
  });
}

export default withSessionApiRoute(handler);
