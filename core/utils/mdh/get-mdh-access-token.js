import MDHService from './mdh-service';

export async function getMdhAccessToken(
  serviceAccountId,
  projectId,
  privateKey
) {
  const mdhService = new MDHService({
    serviceAccountId,
    privateKey,
    projectId,
  });

  const result = await mdhService.getAccessToken();

  if (!result || !result.access_token) {
    return null;
  }

  return result;
}
