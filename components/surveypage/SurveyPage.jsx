import {
  SurveyParsingSection,
  StoredSurveySection,
  ParticipantInfoSection,
  BreadcrumbSection,
} from './components';

export const SurveyPage = () => {
  return (
    <>
      <BreadcrumbSection />
      <ParticipantInfoSection />
      <StoredSurveySection />
      <SurveyParsingSection />
    </>
  );
};
