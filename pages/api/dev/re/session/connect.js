import bcrypt from 'bcrypt';
import ServiceAccount from '@/core/models/ServiceAccount';
import {
  withSessionApiRoute,
  getExpirationTimestamp,
  getMdhAccessToken,
  jwtUtils,
} from '@/core/utils';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const { serviceAccountId, password } = req.body;

  if (!password || !serviceAccountId) {
    return res.status(404).json({
      success: false,
      message: 'Missing credentials. Please try again!',
    });
  }

  try {
    const existingAccount = await ServiceAccount.findOne({
      mdh_id: serviceAccountId,
    });

    if (!existingAccount) {
      return res.status(404).json({
        success: false,
        message: 'Service account not found. Please try again!',
      });
    }

    if (!bcrypt.compareSync(password, existingAccount.password_hash)) {
      return res.status(403).json({
        success: false,
        message: 'Wrong password. Please try again!',
      });
    }

    const { access_token, token_expires_at, project_id, private_key_encoded } =
      existingAccount;

    if (new Date() < token_expires_at) {
      existingAccount.last_accessed = new Date();
      await existingAccount.save();
      const itemToEncode = {
        serviceAccountId,
        accessToken: access_token,
        projectId: project_id,
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

    const { privateKey } = jwtUtils.decode(private_key_encoded);

    const result = await getMdhAccessToken(
      serviceAccountId,
      project_id,
      privateKey
    );

    if (!result) {
      return res.status(403).json({
        success: false,
        message: 'Could not log in. Please try again!',
      });
    }

    const tokenExpiresAt = getExpirationTimestamp(result.expires_in);

    existingAccount.access_token = result.access_token;
    existingAccount.token_expires_at = tokenExpiresAt;
    existingAccount.last_accessed = new Date();
    await existingAccount.save();

    const itemToEncode = {
      serviceAccountId,
      accessToken: result.access_token,
      projectId: project_id,
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
