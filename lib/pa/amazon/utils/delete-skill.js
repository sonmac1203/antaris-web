import { createAmazonService } from './create-amazon-service';

export async function deleteSkill(accessToken) {
  const amazonService = createAmazonService('lwa');
  const result = await amazonService.deleteSkillAndUnlinkAccount(accessToken);
  return result;
}
