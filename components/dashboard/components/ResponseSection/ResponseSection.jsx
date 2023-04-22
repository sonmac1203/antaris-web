import { PageSectionWrapper } from '@/core/components';
import { ExportButton, ResponseSectionMain } from './components';

export const ResponseSection = () => {
  return (
    <PageSectionWrapper
      title='Responses'
      topRightOptions={[<ExportButton key={1} />]}
    >
      <ResponseSectionMain />
    </PageSectionWrapper>
  );
};
