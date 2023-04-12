import { useMemo } from 'react';
import { DashboardLayout } from '@/components/layouts';
import { ParticipantPage } from '@/components/participantpage';
import {
  fetchMdhOneParticipant,
  jwtUtils,
  withSsrAuth,
  fetchParticipantResponses,
} from '@/core/utils';
import { ParticipantContext } from '@/core/context';

const ParticipantDetails = (props) => {
  const participantContextValue = useMemo(() => props, [props]);

  return (
    <ParticipantContext.Provider value={participantContextValue}>
      <ParticipantPage />
    </ParticipantContext.Provider>
  );
};

ParticipantDetails.Layout = DashboardLayout;

export default ParticipantDetails;

export const getServerSideProps = withSsrAuth(async ({ req, params }) => {
  const { token, role } = req.session;
  const { participant_identifier: participantIdentifier } = params;
  const { accessToken, projectId } = jwtUtils.decode(token);
  const query = {
    accessToken,
    projectId,
    participantIdentifier,
  };
  try {
    const participant = await fetchMdhOneParticipant(query);
    const responses = await fetchParticipantResponses({
      participantIdentifier,
    });
    return {
      props: {
        participantData: JSON.parse(JSON.stringify(participant)),
        assignedSurveys: JSON.parse(
          JSON.stringify(participant.alexa_metadata.assigned_surveys)
        ),
        participantResponses: JSON.parse(JSON.stringify(responses)),
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
