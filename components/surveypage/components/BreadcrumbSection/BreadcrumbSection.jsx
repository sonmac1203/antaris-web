import { Breadcrumb } from 'react-bootstrap';
import { useSurvey } from '@/core/hooks';

export const BreadcrumbSection = () => {
  const { surveyData: data } = useSurvey();

  return (
    <Breadcrumb>
      <Breadcrumb.Item href='/dash'>Dashboard</Breadcrumb.Item>
      <Breadcrumb.Item active>{data.surveyDisplayName}</Breadcrumb.Item>
    </Breadcrumb>
  );
};
