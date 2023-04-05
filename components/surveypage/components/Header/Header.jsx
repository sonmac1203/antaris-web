import { PageTitle } from '@/core/components';
import { SurveyImportModal } from '../SurveyImportModal';
import { BreadcrumbSection } from '../BreadcrumbSection';
import { useSurvey } from '@/core/hooks';
export const Header = () => {
  const {
    surveyData: { surveyDisplayName },
  } = useSurvey();
  return (
    <>
      <BreadcrumbSection title={surveyDisplayName} />
      <div className='d-flex align-items-center justify-content-between'>
        <PageTitle>{surveyDisplayName}</PageTitle>
        <SurveyImportModal />
      </div>
    </>
  );
};
