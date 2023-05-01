import { DashboardLayout } from '@/components/layouts';
import { Dashboard } from '@/components/dashboard';
import { withSsrAuth, jsonify } from '@/core/utils';
import {
  getRespondentsWithAssignments,
  DashboardProvider,
} from '@/lib/re/dashboard';

const DashboardIndex = (props) => {
  return (
    <DashboardProvider value={props}>
      <Dashboard />
    </DashboardProvider>
  );
};

DashboardIndex.Layout = DashboardLayout;

export default DashboardIndex;

export const getServerSideProps = withSsrAuth(async ({ req }) => {
  const { role } = req.session;

  try {
    const responseSectionData = await getRespondentsWithAssignments();
    return {
      props: {
        responseSectionData: responseSectionData
          ? jsonify(responseSectionData)
          : {},
        user: jsonify({ isAuthenticated: true, role }),
      },
    };
  } catch {
    return {
      redirect: {
        destination: '/re/dashboard',
        permanent: false,
      },
    };
  }
});
