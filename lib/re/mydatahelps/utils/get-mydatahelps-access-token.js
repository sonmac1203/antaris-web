import { MyDataHelpsClient } from '../modules';

export async function getMyDataHelpsAccessToken(
  serviceAccountId,
  projectId,
  privateKey
) {
  const client = new MyDataHelpsClient({
    serviceAccountId,
    privateKey,
    projectId,
  });
  const result = await client.getAccessToken();

  if (!result || !result.access_token) {
    return null;
  }
  return result;
}
