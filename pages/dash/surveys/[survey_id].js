import React from 'react';
import { DashboardLayout } from '@/components/layouts';
import { SurveyPage } from '@/components/surveypage';

const SurveyDetails = ({ surveyData }) => {
  return <SurveyPage surveyData={surveyData} />;
};

SurveyDetails.Layout = DashboardLayout;

export async function getServerSideProps(context) {
  const { survey_id: surveyId } = context.params;
  const { data: surveyData } = context.query;

  if (surveyData) {
    // If survey data is provided as a query parameter, parse it from JSON
    const parsedSurveyData = JSON.parse(decodeURIComponent(surveyData));
    return { props: { surveyData: parsedSurveyData } };
  }

  // // If survey data is not provided, fetch it from the API
  // const res = await fetch(`https://example.com/api/surveys/${surveyId}`);
  // surveyData = await res.json();

  return { props: { surveyData } };
}

export default SurveyDetails;
