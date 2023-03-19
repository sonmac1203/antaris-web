import { withIronSessionSsr } from 'iron-session/next';
import { sessionCookie } from '../auth';

export const withSession = (handler) =>
  withIronSessionSsr(handler, sessionCookie);
