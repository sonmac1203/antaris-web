import ServiceAccount from '@/core/models/ServiceAccount';
import connectToDb from '@/core/db/connectToDb';
import MDHService from '@/core/utils/mdh/mdh-service';
import { withSessionApiRoute } from '@/core/utils';
import jwtUtils from '@/core/utils/jwt-utils';

const fs = require('fs');
const privateKeyPath = 'core/utils/mdh/private_key.pem';

const handler = async (req, res) => {
  const { state: stateString } = req.query;
  if (!stateString) {
    return;
  }

  const { researcher_token: token } = req.session;
  const { projectId, serviceAccountId } = jwtUtils.decode(token);

  await connectToDb();

  try {
    const existingAccount = await ServiceAccount.findOne({
      mdh_id: serviceAccountId,
      project_id: projectId,
    });

    const privateKey = fs.readFileSync(privateKeyPath);
    const mdhService = new MDHService({
      serviceAccountId,
      privateKey,
      projectId,
    });
    const result = await mdhService.getAccessToken();
    if (!result || !result.access_token) {
      req.session.destroy();
      await req.session.save();
      return res.redirect('/');
    }

    // Calculate the token expiration time
    const tokenExpiresAt = new Date(
      new Date().getTime() + result.expires_in * 1000
    );

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
    req.session.researcher_token = authToken;
    await req.session.save();
    return es.redirect('/dash');
  } catch (err) {
    req.session.destroy();
    await req.session.save();
    return res.redirect('/');
  }
};

export default withSessionApiRoute(handler);
