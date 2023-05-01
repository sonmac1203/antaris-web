import { Badge, Card } from 'react-bootstrap';
import { SideListItem } from '../SideListItem';
import { useDashboard } from '@/lib/re/dashboard';
import { PageSectionWrapper } from '@/core/components';

export const SurveySection = () => {
  const { useSurveysData } = useDashboard();
  const { data: result, loading, error } = useSurveysData();

  return (
    <PageSectionWrapper title='Surveys'>
      <Card className='d-flex flex-column gap-3 p-3'>
        {error
          ? 'Could not load surveys'
          : loading
          ? 'Please wait...'
          : result
          ? result.data.map((s, key) => {
              const href = `/re/dashboard/surveys/${s.surveyID}`;
              const label = s.surveyDisplayName;
              const badge = s.content ? (
                <Badge bg='warning' text='dark'>
                  imported
                </Badge>
              ) : null;
              return (
                <SideListItem
                  label={label}
                  decorator={badge}
                  key={key}
                  href={href}
                />
              );
            })
          : 'No surveys found.'}
      </Card>
    </PageSectionWrapper>
  );
};
