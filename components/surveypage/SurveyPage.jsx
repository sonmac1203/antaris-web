import React, { useState } from 'react';
import {
  SurveyParsingSection,
  StoredSurveySection,
  ParticipantInfoSection,
  HistorySection,
  BreadcrumbSection,
} from './components';

export const SurveyPage = ({ data }) => {
  const { participantIdentifier, surveyID, fromDatabase } = data;
  const [participantData, setParticipantData] = useState(null);

  return (
    <>
      <BreadcrumbSection />
      {fromDatabase && <StoredSurveySection />}
      <SurveyParsingSection
        surveyData={data}
        participantData={participantData}
      />
      <ParticipantInfoSection />
      {fromDatabase && (
        <HistorySection
          surveyId={surveyID}
          participantIdentifier={participantIdentifier}
        />
      )}
    </>
  );
};
