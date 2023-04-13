import axios from 'axios';
export async function refreshSession(redirect) {
  await axios.get('/api/dev/re/session/refresh', { params: { redirect } });
}
