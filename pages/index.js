import { jsonify } from '@/core/utils';
import { Homepage } from '@/components/homepage';
import { HomeLayout } from '@/components/layouts';
import { withSession } from '@/core/utils';

const HomeIndex = () => {
  return <Homepage />;
};

HomeIndex.Layout = HomeLayout;

export default HomeIndex;

export const getServerSideProps = withSession(async ({ req }) => {
  const { token, role } = req.session;
  const isAuthenticated = !!token;

  return {
    props: {
      user: isAuthenticated ? jsonify({ isAuthenticated, role }) : null,
    },
  };
});
