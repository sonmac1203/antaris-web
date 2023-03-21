import jwtUtils from '@/core/utils/jwt-utils';
import AmazonAccount from '@/core/models/AmazonAccount';
import { createAmazonService } from '@/core/utils/amazon';
import connectToDb from '@/core/db/connectToDb';

async function getUserProfile(accessToken) {
  const amazonService = createAmazonService('lwa');
  const profileResult = await amazonService.getUserProfile(accessToken);
  return profileResult.hasOwnProperty('error') ? null : profileResult;
}

async function updateAmazonAccount(
  email,
  name,
  accessToken,
  refreshToken,
  expiresIn
) {
  const updatedDoc = await AmazonAccount.findOneAndUpdate(
    { email: email },
    {
      $set: {
        name: name,
        lwa_access_token: accessToken,
        lwa_refresh_token: refreshToken,
        lwa_token_expires_at: new Date(new Date().getTime() + expiresIn * 1000),
      },
      $setOnInsert: {
        email: email,
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  return updatedDoc;
}

export async function fetchUserFromToken(sessionToken) {
  const {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: expiresIn,
  } = jwtUtils.decode(sessionToken);
  const { name, email } = await getUserProfile(accessToken);

  if (!name || !email) {
    return {
      success: false,
      message: 'Unable to retrieve user profile. Try again.',
    };
  }

  await connectToDb();

  try {
    const updatedDoc = await updateAmazonAccount(
      email,
      name,
      accessToken,
      refreshToken,
      expiresIn
    );
    const { alexa_metadata } = updatedDoc;
    return {
      success: true,
      message: 'User is retrieved.',
      data: {
        name,
        email,
        accountLinked: alexa_metadata.account_linked,
        skillEnabled: alexa_metadata.skill_enabled,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error happened. Try again.',
    };
  }
}
