import { useEffect, useState } from 'react';
import { useResponse } from '@/core/hooks';
import { PageTitle } from '@/core/components';
import {
  FilterBar,
  FilterButton,
  ExportButton,
  ActivityCard,
} from './components';
import styles from './ResponsePage.module.css';

export const ResponsePage = () => {
  const { responsesData } = useResponse();

  const [isRefreshing, setIsRefreshing] = useState(true);

  const startRefreshing = () => setIsRefreshing(true);

  useEffect(() => {
    setIsRefreshing(false);
  }, [responsesData]);

  return (
    <div className='core-container'>
      <PageTitle className='mb-4'>Responses history</PageTitle>
      <FilterBar />
      <div className={styles.ButtonsContainer}>
        <ExportButton />
        <FilterButton startRefreshing={startRefreshing} />
      </div>

      <section className='d-flex flex-column gap-4'>
        {isRefreshing
          ? 'Loading responses...'
          : responsesData.map((item, key) => (
              <ActivityCard item={item} key={key} />
            ))}
      </section>
    </div>
  );
};
