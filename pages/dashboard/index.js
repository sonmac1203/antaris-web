import { Dash } from '@/components/dash';
import { DashboardLayout } from '@/components/layouts';
import { withSsrAuth, jwtUtils } from '@/core/utils';

const DashPage = ({ accountData }) => {
  return <Dash data={accountData} />;
};

DashPage.Layout = DashboardLayout;

export default DashPage;

export const getServerSideProps = withSsrAuth(async ({ req }) => {
  const { token } = req.session;
  const accountData = jwtUtils.decode(token);
  return {
    props: { accountData },
  };
});
