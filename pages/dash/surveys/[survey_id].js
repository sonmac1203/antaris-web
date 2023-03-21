import { useMemo } from 'react';
import { DashboardLayout } from '@/components/layouts';
import { SurveyPage } from '@/components/surveypage';
import { withSession, groupSurveyById } from '@/core/utils';
import { fetchMdhSurveys } from '@/core/utils/mdh';
import jwtUtils from '@/core/utils/jwt-utils';
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
      <SurveyPage data={surveyData} />
    </SurveyContext.Provider>
  );
};

SurveyDetails.Layout = DashboardLayout;

export const getServerSideProps = withSession(async ({ req, params }) => {
  const { researcher_token: token } = req.session;
  const { survey_id: surveyID } = params;
  if (!token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
  const { accessToken, projectId } = jwtUtils.decode(token);

  const query = {
    accessToken,
    projectId,
    params: {
      surveyID,
    },
  };

  try {
    const data = await fetchMdhSurveys(query);
    const surveyData = groupSurveyById(data.surveyTasks)[0];
    return {
      props: { surveyData: { ...surveyData, fromDatabase: false } },
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
