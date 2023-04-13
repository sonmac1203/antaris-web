import { Badge, Card } from 'react-bootstrap';
import { SideListItem } from '../SideListItem';
import { useDashboard } from '@/lib/re/dashboard';
import { PageSectionWrapper } from '@/core/components';
import styles from './SurveySection.module.css';

export const SurveySection = () => {
  const { surveys } = useDashboard();
  return (
    <PageSectionWrapper title='Surveys'>
      <Card className='d-flex flex-column gap-3 p-3'>
        {surveys
          ? surveys.map((s, key) => {
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
          : 'Could not load surveys.'}
      </Card>
    </PageSectionWrapper>
  );
};
