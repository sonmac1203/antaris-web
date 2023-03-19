export const sessionCookie = {
  cookieName: 'session',
  password: process.env.COOKIE_SECRET,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
