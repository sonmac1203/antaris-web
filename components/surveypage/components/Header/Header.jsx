import { PageTitle } from '@/core/components';
import { SurveyImportModal } from '../SurveyImportModal';

export const Header = () => {
  return (
    <div className='d-flex align-items-center justify-content-between'>
      <PageTitle>Antaris Project Consent</PageTitle>
      <SurveyImportModal />
    </div>
  );
};
