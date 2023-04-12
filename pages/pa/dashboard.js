import { DashboardLayout } from '@/components/layouts';
import { ParticipantDashboard } from '@/components/participantdashboard';
import { withSession } from '@/core/utils';
import { fetchUserFromToken } from '@/core/utils/amazon';
import { ParticipantDashboardProvider } from '@/core/providers';

const ParticipantDashboardIndex = (props) => {
  return (
    <ParticipantDashboardProvider value={props}>
      <ParticipantDashboard />
    </ParticipantDashboardProvider>
  );
};

ParticipantDashboardIndex.Layout = DashboardLayout;

export default ParticipantDashboardIndex;

export const getServerSideProps = withSession(async ({ req, res }) => {
  const { token } = req.session;
  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const result = await fetchUserFromToken(token);

  if (!result.success) {
    return {
      redirect: {
        destination: '/participants',
        permanent: false,
      },
    };
  }

  return {
    props: { participantData: JSON.parse(JSON.stringify(result.data)) },
  };
});
