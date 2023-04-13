import { jwtUtils } from '@/core/utils';
import { getUserProfile } from '../../amazon/utils';
import { updateAmazonAccount } from './update-amazon-account';
import connectToDb from '@/core/db/connectToDb';

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
