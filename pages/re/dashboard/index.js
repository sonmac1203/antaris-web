import { DashboardLayout } from '@/components/layouts';
import { Dashboard } from '@/components/dashboard';
import { withSsrAuth, jwtUtils, jsonify } from '@/core/utils';
import {
  getAllSurveys,
  getAllParticipants,
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
  const { token, role } = req.session;
  const sessionData = jwtUtils.decode(token);

  try {
    const [surveys, participants, responseSectionData] = await Promise.all([
      getAllSurveys(sessionData),
      getAllParticipants(sessionData),
      getRespondentsWithAssignments(),
    ]);

    return {
      props: {
        surveys: surveys ? jsonify(surveys) : [],
        participants: participants ? jsonify(participants) : [],
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
