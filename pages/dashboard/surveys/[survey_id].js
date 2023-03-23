import { useMemo } from 'react';
import { DashboardLayout } from '@/components/layouts';
import { SurveyPage } from '@/components/surveypage';
import { fetchMdhSurveys, jwtUtils, withSsrAuth } from '@/core/utils';
import { SurveyContext } from '@/core/context';

const SurveyDetails = ({ surveyData }) => {
  const surveyContextValue = useMemo(
    () => ({
      surveyData,
      participantsData: surveyData.participants,
    }),
    [surveyData]
  );

  return (
    <SurveyContext.Provider value={surveyContextValue}>
      <SurveyPage />
    </SurveyContext.Provider>
  );
};

SurveyDetails.Layout = DashboardLayout;

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
    const surveys = await fetchMdhSurveys(query);
    return {
      props: { surveyData: JSON.parse(JSON.stringify(surveys[0])) },
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

export default SurveyDetails;
