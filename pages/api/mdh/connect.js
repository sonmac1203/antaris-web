import ServiceAccount from '@/core/models/ServiceAccount';
import connectToDb from '@/core/db/connectToDb';
import MDHService from '@/core/utils/mdh/mdh-service';
import { withSessionApiRoute } from '@/core/utils/session';
import jwtUtils from '@/core/utils/jwt-utils';

const fs = require('fs');
const privateKeyPath = 'core/utils/mdh/private_key.pem';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const { projectId, serviceAccountId } = req.body;

  if (!projectId || !serviceAccountId) {
    return res.status(404).json({
      success: false,
      message: 'Missing body',
    });
  }

  await connectToDb();

  try {
    const existingAccount = await ServiceAccount.findOne({
      mdh_id: serviceAccountId,
      project_id: projectId,
    });

    if (existingAccount) {
      existingAccount.last_accessed = new Date();
      await existingAccount.save();
      const { access_token, token_expires_at } = existingAccount;
      if (new Date() < token_expires_at) {
        const itemToEncode = {
          serviceAccountId,
          accessToken: access_token,
          projectId,
          tokenExpiresAt: token_expires_at,
        };
        const authToken = jwtUtils.encode(itemToEncode);
        req.session.token = authToken;
        await req.session.save();
        return res.status(200).json({
          success: true,
          message: 'You have successfully logged in.',
        });
      }
    }

    const privateKey = fs.readFileSync(privateKeyPath);
    const mdhService = new MDHService({
      serviceAccountId,
      privateKey,
      projectId,
    });
    const result = await mdhService.getAccessToken();
    if (!result || !result.access_token) {
      return res.status(403).json({
        success: false,
        message: 'Wrong information. Please try again!',
      });
    }

    // Calculate the token expiration time
    const tokenExpiresAt = new Date(
      new Date().getTime() + result.expires_in * 1000
    );

    if (existingAccount) {
      existingAccount.access_token = result.access_token;
      existingAccount.token_expires_at = tokenExpiresAt;
      await existingAccount.save();
    } else {
      await ServiceAccount.create({
        project_id: projectId,
        mdh_id: serviceAccountId,
        access_token: result.access_token,
        token_expires_at: tokenExpiresAt,
      });
    }
    const itemToEncode = {
      serviceAccountId,
      accessToken: result.access_token,
      projectId,
      tokenExpiresAt,
    };
    const authToken = jwtUtils.encode(itemToEncode);
    req.session.token = authToken;
    await req.session.save();
    return res.status(200).json({
      success: true,
      message: 'You have successfully logged in.',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
    });
  }
};

export default withSessionApiRoute(handler);
