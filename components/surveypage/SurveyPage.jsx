import { useState } from 'react';
import {
  SurveyParsingSection,
  StoredSurveySection,
  ParticipantInfoSection,
  HistorySection,
  BreadcrumbSection,
} from './components';
import { useSurvey } from '@/core/hooks';

export const SurveyPage = () => {
  const { surveyData } = useSurvey();
  const { participantIdentifier, surveyID, fromDatabase } = surveyData;
  const [participantData, setParticipantData] = useState(null);

  return (
    <>
      <BreadcrumbSection />
      <ParticipantInfoSection />
      <StoredSurveySection />
      <SurveyParsingSection
        surveyData={surveyData}
        participantData={participantData}
      />
      {/* {fromDatabase && (
        <HistorySection
          surveyId={surveyID}
          participantIdentifier={participantIdentifier}
        />
      )} */}
    </>
  );
};
