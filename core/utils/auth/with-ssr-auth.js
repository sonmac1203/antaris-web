import { withSession } from '../session/with-session';

export const withSsrAuth = (gssp) =>
  withSession(async function (context) {
    const { token } = context.req.session;
    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return await gssp(context);
  });
