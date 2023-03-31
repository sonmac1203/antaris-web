import { Breadcrumb } from 'react-bootstrap';
import { useSurvey } from '@/core/hooks';
import Link from 'next/link';

export const BreadcrumbSection = () => {
  const { surveyData: data } = useSurvey();

  return (
    <Breadcrumb style={{ fontSize: '1.5rem' }}>
      <Breadcrumb.Item linkAs={Link} href='/dashboard'>
        Dash
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{data.surveyDisplayName}</Breadcrumb.Item>
    </Breadcrumb>
  );
};
