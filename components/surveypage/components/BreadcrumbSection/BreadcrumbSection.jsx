import { Breadcrumb } from 'react-bootstrap';
import { useSurvey } from '@/core/hooks';
import Link from 'next/link';

export const BreadcrumbSection = () => {
  const { surveyData: data } = useSurvey();

  return (
    <Breadcrumb>
      <Breadcrumb.Item linkAs={Link} href='/dash'>
        Dashboard
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{data.surveyDisplayName}</Breadcrumb.Item>
    </Breadcrumb>
  );
};
