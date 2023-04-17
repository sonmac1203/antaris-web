import bcrypt from 'bcrypt';
import ServiceAccount from '@/core/models/ServiceAccount';
import {
  withSessionApiRoute,
  getExpirationTimestamp,
  jwtUtils,
} from '@/core/utils';
import connectToDb from '@/core/db/connectToDb';
import { getMyDataHelpsAccessToken } from '@/lib/re/mydatahelps';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const { projectId, serviceAccountId, password, privateKey } = req.body;

  if (!projectId || !serviceAccountId || !password || !privateKey) {
    return res.status(500).json({
      success: false,
      message: 'Missing credentials. Please check again!',
    });
  }

  await connectToDb();

  try {
    const existingAccount = await ServiceAccount.findOne({
      mdh_id: serviceAccountId,
      project_id: projectId,
    });

    if (existingAccount) {
      return res.status(401).json({
        success: false,
        message: 'This service account ID has been used. Please sign in!',
      });
    }

    const result = await getMyDataHelpsAccessToken(
      serviceAccountId,
      projectId,
      privateKey
    );

    if (!result) {
      return res.status(403).json({
        success: false,
        message: 'Wrong information. Please try again!',
      });
    }

    const tokenExpiresAt = getExpirationTimestamp(result.expires_in);
    const passwordHash = bcrypt.hashSync(password, 10);

    const privateKeyEncoded = jwtUtils.encode({ privateKey });

    await ServiceAccount.create({
      project_id: projectId,
      mdh_id: serviceAccountId,
      private_key_encoded: privateKeyEncoded,
      password_hash: passwordHash,
      access_token: result.access_token,
      token_expires_at: tokenExpiresAt,
      last_accessed: new Date(),
    });

    const itemToEncode = {
      serviceAccountId,
      accessToken: result.access_token,
      projectId,
      tokenExpiresAt,
    };
    const authToken = jwtUtils.encode(itemToEncode);
    req.session.token = authToken;
    req.session.role = 'researcher';
    await req.session.save();
    return res.status(200).json({
      success: true,
      message: 'You are in! Redirecting to dashboard...',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
    });
  }
};

export default withSessionApiRoute(handler);
