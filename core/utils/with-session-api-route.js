import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionCookie } from '../auth';

export const withSessionApiRoute = (handler) =>
  withIronSessionApiRoute(handler, sessionCookie);
