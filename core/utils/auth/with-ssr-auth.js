import { withSession } from '../session/with-session';
import { jsonify } from '../tools';

export function withSsrAuth(gssp) {
  return withSession(async (context) => {
    const { token, role } = context.req.session;
    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    const gsspData = await gssp(context); // Run `getServerSideProps` to get page-specific data
    if (gsspData.hasOwnProperty('redirect')) {
      return gsspData;
    }
    const isAuthenticated = !!token;

    // Pass page-specific props along with user data from `withAuth` to component
    return {
      props: {
        ...gsspData.props,
        user: isAuthenticated ? jsonify({ isAuthenticated, role }) : null,
      },
    };
  });
}
