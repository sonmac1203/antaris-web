import ServiceAccount from '@/core/models/ServiceAccount';
import {
  withSessionApiRoute,
  getExpirationTimestamp,
  // getMdhAccessToken,
  jwtUtils,
} from '@/core/utils';
import { getMyDataHelpsAccessToken } from '@/lib/re/mydatahelps';

const handler = async (req, res) => {
  const { token } = req.session;

  if (!token) {
    return res.status(403).json({
      message: 'You are not authorized',
    });
  }

  const { projectId, serviceAccountId } = jwtUtils.decode(token);
  const { redirect } = req.query;

  try {
    const existingAccount = await ServiceAccount.findOne({
      mdh_id: serviceAccountId,
      project_id: projectId,
    });

    const { privateKey } = jwtUtils.decode(existingAccount.private_key_encoded);

    const result = await getMyDataHelpsAccessToken(
      serviceAccountId,
      projectId,
      privateKey
    );

    if (!result) {
      req.session.destroy();
      await req.session.save();
      return res.status(307).redirect('/');
    }

    const tokenExpiresAt = getExpirationTimestamp(result.expires_in);

    existingAccount.access_token = result.access_token;
    existingAccount.token_expires_at = tokenExpiresAt;
    await existingAccount.save();

    const itemToEncode = {
      serviceAccountId,
      accessToken: result.access_token,
      projectId,
      tokenExpiresAt,
    };
    const authToken = jwtUtils.encode(itemToEncode);
    req.session.token = authToken;
    await req.session.save();
    return res.status(307).redirect(redirect);
  } catch (err) {
    req.session.destroy();
    await req.session.save();
    return res.status(307).redirect('/');
  }
};

export default withSessionApiRoute(handler);
