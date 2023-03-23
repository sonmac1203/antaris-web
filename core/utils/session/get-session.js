import { getIronSession } from 'iron-session/edge';
import { sessionCookie } from '@/core/auth';

export async function getSession({ req, res }) {
  const session = await getIronSession(req, res, sessionCookie);
  return session;
}
