import { createAmazonService } from './create-amazon-service';

export async function getUserProfile(accessToken) {
  const amazonService = createAmazonService('lwa');
  const profileResult = await amazonService.getUserProfile(accessToken);
  return profileResult.hasOwnProperty('error') ? null : profileResult;
}
