import { Dash } from '@/components/dash';
import { DashboardLayout } from '@/components/layouts';
import { withSsrAuth } from '@/core/utils';

const DashPage = ({ accountData }) => {
  return <Dash data={accountData} />;
};

DashPage.Layout = DashboardLayout;

export default DashPage;

export const getServerSideProps = withSsrAuth(async () => {
  return {
    props: {},
  };
});
