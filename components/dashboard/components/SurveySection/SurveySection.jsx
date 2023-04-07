import { Badge } from 'react-bootstrap';
import { SideListItem } from '../SideListItem';
import { useDashboard } from '@/core/hooks';
import { PageSectionWrapper } from '@/core/components';

export const SurveySection = () => {
  const { surveys } = useDashboard();
  return (
    <PageSectionWrapper title='Surveys'>
      <div className='d-flex flex-column gap-3'>
        {surveys
          ? surveys.map((s, key) => {
              const href = `/dashboard/surveys/${s.surveyID}`;
              const label = s.surveyDisplayName;
              const badge = s.content ? <Badge>imported</Badge> : null;
              return (
                <SideListItem
                  label={label}
                  decorator={badge}
                  key={key}
                  href={href}
                />
              );
            })
          : 'Could not load surveys.'}
      </div>
    </PageSectionWrapper>
  );
};
