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

const ParticipantDetails = ({ participantData, participantResponses }) => {
  const participantContextValue = useMemo(
    () => ({
      participantData,
      assignedSurveys: participantData.alexa_metadata.assigned_surveys,
      participantResponses,
    }),
    [participantData, participantResponses]
  );

  return (
    <ParticipantContext.Provider value={participantContextValue}>
      <ParticipantPage />
    </ParticipantContext.Provider>
  );
};

ParticipantDetails.Layout = DashboardLayout;

export default ParticipantDetails;

export const getServerSideProps = withSsrAuth(async ({ req, params }) => {
  const { token } = req.session;
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
        participantResponses: responses,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
});
