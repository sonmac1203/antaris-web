import { SurveyPage } from '@/components/surveypage';
import { SurveyOverviewLayout } from '@/components/layouts';
import { jwtUtils, withSsrAuth, jsonify } from '@/core/utils';
import { getSurveyById, SurveyPageProvider } from '@/lib/re/surveyoverview';

const SurveyDetails = (props) => {
  return (
    <SurveyPageProvider value={props}>
      <SurveyPage />
    </SurveyPageProvider>
  );
};

SurveyDetails.Layout = SurveyOverviewLayout;

export const getServerSideProps = withSsrAuth(async ({ req, params }) => {
  const { token } = req.session;
  const { survey_id: surveyID } = params;
  const { accessToken, projectId } = jwtUtils.decode(token);
  const query = {
    accessToken,
    projectId,
    params: {
      surveyID,
    },
  };
  try {
    const surveys = await getSurveyById(query);
    return {
      props: { surveyData: jsonify(surveys[0]) },
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

export default SurveyDetails;
