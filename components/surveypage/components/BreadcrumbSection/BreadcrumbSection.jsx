import { Breadcrumb } from 'react-bootstrap';
import Link from 'next/link';
import styles from './BreadcrumbSection.module.css';

export const BreadcrumbSection = ({ title }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item
        linkAs={Link}
        href='/dashboard'
        className={styles.ItemStyle}
      >
        Dashboard
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{title}</Breadcrumb.Item>
    </Breadcrumb>
  );
};
