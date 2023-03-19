import AmazonService from './amazon-service';
import {
  skillId,
  lwaClientId,
  lwaClientSecret,
  alexaClientId,
  alexaClientSecret,
  getRedirectUri,
} from './config';

export function createAmazonService(type) {
  const redirectUri = getRedirectUri(type);
  let clientId, clientSecret;
  if (type === 'lwa') {
    clientId = lwaClientId;
    clientSecret = lwaClientSecret;
  } else if (type === 'alexa') {
    clientId = alexaClientId;
    clientSecret = alexaClientSecret;
  } else {
    throw new Error('Invalid Amazon Service type');
  }
  return new AmazonService(clientId, clientSecret, redirectUri, skillId);
}
