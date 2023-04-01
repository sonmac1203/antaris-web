import { PageTitle } from '@/core/components';
import { SurveyImportModal } from '../SurveyImportModal';
import { useSurvey } from '@/core/hooks';

export const Header = () => {
  const {
    surveyData: { surveyDisplayName },
  } = useSurvey();
  return (
    <div className='d-flex align-items-center justify-content-between'>
      <PageTitle>{surveyDisplayName}</PageTitle>
      <SurveyImportModal />
    </div>
  );
};
