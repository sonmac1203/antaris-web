import { ParticipantOverviewLayout } from '@/components/layouts';
import { ParticipantPage } from '@/components/participantpage';
import { jwtUtils, withSsrAuth, jsonify } from '@/core/utils';
import {
  getParticipantById,
  getResponses,
  ParticipantPageProvider,
} from '@/lib/re/participantoverview';

const ParticipantDetails = (props) => {
  return (
    <ParticipantPageProvider value={props}>
      <ParticipantPage />
    </ParticipantPageProvider>
  );
};

ParticipantDetails.Layout = ParticipantOverviewLayout;

export default ParticipantDetails;

export const getServerSideProps = withSsrAuth(async ({ req, params }) => {
  const { token } = req.session;
  const { participant_identifier: participantIdentifier } = params;
  const { accessToken, projectId } = jwtUtils.decode(token);
  const query = { accessToken, projectId, participantIdentifier };

  try {
    const [participant, responses] = await Promise.all([
      getParticipantById(query),
      getResponses({ participantIdentifier }),
    ]);
    return {
      props: {
        participantData: jsonify(participant),
        assignedSurveys: jsonify(participant.alexa_metadata.assigned_surveys),
        participantResponses: jsonify(responses),
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
