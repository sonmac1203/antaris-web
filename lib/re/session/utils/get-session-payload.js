import axios from 'axios';
export async function getSessionPayload() {
  try {
    const { data: result } = await axios.get('/api/dev/re/session');
    return { payload: result.data, role: result.role };
  } catch {
    return null;
  }
}
