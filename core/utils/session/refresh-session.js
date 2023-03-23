import axios from 'axios';

export async function refreshSession(redirect) {
  await axios.get('/api/mdh/refresh', { params: { redirect } });
}
