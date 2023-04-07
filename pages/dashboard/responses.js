import {
  fetchResponses,
  jwtUtils,
  withSsrAuth,
  fetchParticipantsAndSurveysWithAssignments,
} from '@/core/utils';
import { DashboardLayout } from '@/components/layouts';
import { ResponsePage } from '@/components/responsepage';
import { ResponsePageProvider } from '@/core/providers';

const ResponsesDetails = (props) => {
  return (
    <ResponsePageProvider value={props}>
      <ResponsePage />
    </ResponsePageProvider>
  );
};

ResponsesDetails.Layout = DashboardLayout;

export const getServerSideProps = withSsrAuth(async ({ req, query }) => {
  const { token, role } = req.session;
  const { projectId } = jwtUtils.decode(token);
  const props = { ...query, project_id: projectId };

  try {
    const responses = await fetchResponses(props);
    const { participants, surveys } =
      await fetchParticipantsAndSurveysWithAssignments();

    const defaultParticipants = query.participant_ids
      ? participants
          .filter((p) =>
            query.participant_ids.includes(p.participant_identifier)
          )
          .map((p) => ({
            value: p.participant_identifier,
            label: `${p.demographics.first_name} ${p.demographics.last_name}`,
          }))
      : [];
    const defaultSurveys = query.survey_ids
      ? surveys
          .filter((s) => query.survey_ids.includes(s.mdh_id))
          .map((s) => ({
            value: s.mdh_id,
            label: s.display_name,
          }))
      : [];
    const defaultStartTime = query.start || '';
    const defaultEndTime = query.end || '';

    if (!responses) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    }

    return {
      props: {
        filterData: JSON.parse(
          JSON.stringify({
            defaultParticipants,
            defaultSurveys,
            defaultEndTime,
            defaultStartTime,
          })
        ),
        responsesData: JSON.parse(JSON.stringify(responses)),
        participantsData: participants
          ? JSON.parse(JSON.stringify(participants))
          : [],
        surveysData: surveys ? JSON.parse(JSON.stringify(surveys)) : [],
        user: JSON.parse(JSON.stringify({ isAuthenticated: true, role })),
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

export default ResponsesDetails;
