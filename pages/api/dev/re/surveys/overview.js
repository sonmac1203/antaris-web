import connectToDb from '@/core/db/connectToDb';
import { withSessionApiRoute } from '@/core/utils';
import { getQuestionOverview } from '@/lib/re/surveyoverview';

const authTokenFromInside = process.env.API_SECRET;

async function handler(req, res) {
  const { token } = req.session;

  const authTokenFromOutside =
    req.headers?.authorization?.split(' ')[1] ?? null;

  if (!token && !authTokenFromOutside) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to make this request.',
    });
  }

  if (authTokenFromOutside && authTokenFromOutside !== authTokenFromInside) {
    return res.status(403).json({
      success: false,
      message: 'Auth token does not match. Please try again!',
    });
  }

  const query = req.query;

  try {
    await connectToDb();
    const responses = await getQuestionOverview(query);
    if (!responses) {
      return res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Responses have been found.',
      data: responses,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
}

export default withSessionApiRoute(handler);
