import AmazonAccount from '@/core/models/AmazonAccount';
import { getExpirationTimestamp } from '@/core/utils';

export async function updateAmazonAccount(
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
        lwa_token_expires_at: getExpirationTimestamp(expiresIn),
      },
      $setOnInsert: {
        email: email,
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  return updatedDoc;
}
