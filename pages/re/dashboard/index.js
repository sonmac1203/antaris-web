import { Dashboard } from '@/components/dashboard';
import { DashboardLayout } from '@/components/layouts';
import {
  withSsrAuth,
  jwtUtils,
  fetchSurveysForDashboard,
  fetchParticipantsForDashboard,
  fetchParticipantsAndSurveysWithAssignments,
} from '@/core/utils';
import { DashboardProvider } from '@/core/providers';

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
  const { token, role } = req.session;
  const sessionData = jwtUtils.decode(token);

  try {
    const surveysAndParticipantsData = await Promise.all([
      fetchSurveysForDashboard(sessionData),
      fetchParticipantsForDashboard(sessionData),
    ]);
    const responseSectionData =
      await fetchParticipantsAndSurveysWithAssignments();

    return {
      props: {
        surveys: surveysAndParticipantsData[0]
          ? JSON.parse(JSON.stringify(surveysAndParticipantsData[0]))
          : [],
        participants: surveysAndParticipantsData[1]
          ? JSON.parse(JSON.stringify(surveysAndParticipantsData[1]))
          : [],
        responseSectionData: responseSectionData
          ? JSON.parse(JSON.stringify(responseSectionData))
          : {},
        user: JSON.parse(JSON.stringify({ isAuthenticated: true, role })),
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/re/dashboard',
        permanent: false,
      },
    };
  }
});
