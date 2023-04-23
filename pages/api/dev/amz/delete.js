import { AmazonAccount, Participant } from '@/core/models';
import { withSessionApiRoute } from '@/core/utils';
import { createAmazonService } from '@/lib/pa/amazon';
import { deleteSkill } from '@/lib/pa/amazon';

const authTokenFromInside = process.env.API_SECRET;

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const { token } = req.session;
  const { email } = req.query;

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

  try {
    const existingAccount = await AmazonAccount.findOne({ email: email });
    const {
      alexa_access_token: alexaAccessToken,
      alexa_refresh_token: alexaRefreshToken,
      alexa_token_expires_at: expiresAt,
      participants: participantReferences,
    } = existingAccount.alexa_metadata;

    let tokenToUse = alexaAccessToken;

    if (new Date() > expiresAt) {
      const amazonClient = createAmazonService('alexa');
      const tokenResult = await amazonClient.refreshAccessToken(
        alexaRefreshToken
      );
      if (tokenResult.hasOwnProperty('message')) {
        return res.status(404).json({
          success: false,
          message: 'Could not delete skill.',
        });
      }
      tokenToUse = tokenResult.access_token;
    }

    const result = await deleteSkill(tokenToUse);

    if (
      result.status !== 202 &&
      result.status !== 200 &&
      result.status !== 204
    ) {
      return res.status(404).json({
        success: false,
        message: 'Could not delete skill.',
      });
    }

    await Participant.deleteMany({ _id: { $in: participantReferences } });
    existingAccount.alexa_metadata.alexa_access_token = '';
    existingAccount.alexa_metadata.alexa_refresh_token = '';
    existingAccount.alexa_metadata.alexa_token_expires_at = '';
    existingAccount.alexa_metadata.participants = [];
    existingAccount.alexa_metadata.skill_enabled = false;
    existingAccount.alexa_metadata.account_linked = false;
    existingAccount.alexa_metadata.project_id = '';
    existingAccount.alexa_metadata.user_id = '';

    await existingAccount.save();

    return res.status(200).json({
      success: true,
      message: 'Unlinked and deleted skill.',
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      success: false,
      message: 'Could not delete skill.',
    });
  }
};

export default withSessionApiRoute(handler);
