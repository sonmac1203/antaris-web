import axios from 'axios';

export async function getSessionPayloadAsClient() {
  try {
    const { data: result } = await axios.get('/api/session');
    return result.data;
  } catch (err) {
    return null;
  }
}
