import ServiceAccount from '@/core/models/ServiceAccount';
import connectToDb from '@/core/db/connectToDb';
import MDHService from '@/core/utils/mdh/mdh-service';

const fs = require('fs');
const privateKeyPath = 'core/utils/mdh/private_key.pem';

export default async function handler(req, res) {
  const { service_account_id, project_id } = req.query;

  await connectToDb();

  try {
    const existingAccount = await ServiceAccount.findOne({
      mdh_id: service_account_id,
      project_id,
    });

    if (existingAccount) {
      existingAccount.last_accessed = new Date();
      await existingAccount.save();
      const { access_token, token_expires_at } = existingAccount;
      if (new Date() < token_expires_at) {
        return res.status(200).json({
          success: true,
          message: 'Access token found and not expired',
          token_data: { access_token, token_expires_at },
        });
      }
    }

    const privateKey = fs.readFileSync(privateKeyPath);
    const mdhService = new MDHService({
      serviceAccountId: service_account_id,
      privateKey,
      projectId: project_id,
    });
    const result = await mdhService.getAccessToken();
    if (!result || !result.access_token) {
      return res.status(500).json({
        success: false,
        message: 'There was an error. Please check your information again!',
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
        project_id,
        mdh_id: service_account_id,
        access_token: result.access_token,
        token_expires_at: tokenExpiresAt,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Access token has been retrieved and stored.',
      token_data: {
        access_token: result.access_token,
        token_expires_at: tokenExpiresAt,
      },
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message:
        'An error happened while retrieving the token. Please try again!',
    });
  }
}
