import { HomeLayout } from '@/components/layouts';
import { ConnectAlexaPage } from '@/components/participantspage/connect';
import { withSession } from '@/core/utils/session';
import { fetchUserFromToken } from '@/core/utils/amazon';

const ConnectAlexaIndex = ({ participantData }) => {
  return <ConnectAlexaPage data={participantData} />;
};

ConnectAlexaIndex.Layout = HomeLayout;

export default ConnectAlexaIndex;

export const getServerSideProps = withSession(async ({ req, res }) => {
  const { token } = req.session;
  if (!token) {
    return {
      redirect: {
        destination: '/participants',
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
    props: { participantData: result.data },
  };
});
