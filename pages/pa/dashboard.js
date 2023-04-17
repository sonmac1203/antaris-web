import { DashboardLayout } from '@/components/layouts';
import { ParticipantDashboard } from '@/components/participantdashboard';
import { jsonify, withSsrAuth } from '@/core/utils';
import { fetchUserFromToken } from '@/lib/pa/dashboard';
import { ParticipantDashboardProvider } from '@/lib/pa/dashboard';

const ParticipantDashboardIndex = (props) => {
  return (
    <ParticipantDashboardProvider value={props}>
      <ParticipantDashboard />
    </ParticipantDashboardProvider>
  );
};

ParticipantDashboardIndex.Layout = DashboardLayout;

export default ParticipantDashboardIndex;

export const getServerSideProps = withSsrAuth(async ({ req }) => {
  const { token } = req.session;
  const result = await fetchUserFromToken(token);

  if (!result.success) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { participantData: jsonify(result.data) },
  };
});
