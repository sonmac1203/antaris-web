import { Placeholder, Card } from 'react-bootstrap';
import { SelectSkeleton } from './components';
import styles from '../../FilterBar.module.css';

export const FilterBarSkeleton = () => {
  const paddingStyle = { padding: '0.45rem 0.75rem' };

  return (
    <div className={styles.Container}>
      <div className={styles.FilterOptions}>
        <div className={styles.Col}>
          <SelectSkeleton
            text='Select respondents...'
            icon='fa-solid fa-chevron-down'
          />
        </div>
        <div className={styles.Col}>
          <SelectSkeleton text='From - To' icon='fa-regular fa-calendar' />
        </div>
      </div>
      <Placeholder.Button
        variant='primary'
        xs={2}
        className={styles.SkeletonButton}
      />
    </div>
  );
};
