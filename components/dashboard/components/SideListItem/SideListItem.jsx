import Link from 'next/link';
import styles from './SideListItem.module.css';

export const SideListItem = ({ label, decorator, href }) => {
  return (
    <div className='d-flex align-items-center gap-2'>
      <Link href={href} className={styles.Link}>
        <span style={{ fontWeight: 500 }}>{label}</span>
      </Link>
      {decorator}
    </div>
  );
};
