import axios from 'axios';

export async function getSessionPayloadAsClient() {
  try {
    const { data: result } = await axios.get('/api/dev/re/session');
    return result.data;
  } catch (err) {
    return null;
  }
}
