import React, { useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import {
  SurveyParsingSection,
  StoredSurveySection,
  ParticipantInfoSection,
  HistorySection,
} from './components';

export const SurveyPage = ({ surveyData }) => {
  const { surveyDisplayName, participantIdentifier, surveyID } = surveyData;
  const [participantData, setParticipantData] = useState(null);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href='/dash'>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item active>{surveyDisplayName}</Breadcrumb.Item>
      </Breadcrumb>
      <StoredSurveySection />
      <SurveyParsingSection
        surveyData={surveyData}
        participantData={participantData}
      />
      <ParticipantInfoSection
        participantIdentifier={participantIdentifier}
        participantData={participantData}
        setParticipantData={setParticipantData}
      />
      <HistorySection
        surveyId={surveyID}
        participantIdentifier={participantIdentifier}
      />
    </>
  );
};
