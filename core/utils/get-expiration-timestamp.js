export function getExpirationTimestamp(expiryTime) {
  const timestamp = new Date(new Date().getTime() + expiryTime * 1000);
  return timestamp;
}
