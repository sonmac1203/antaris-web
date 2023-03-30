import { useCallback, useEffect } from 'react';
import { useMdh } from '@/core/hooks';
import { SurveyList } from './components';
import styles from './Dash.module.css';

export const Dash = () => {
  const { surveys, loading, error, fetchAllSurveys } = useMdh();

  const loadSurveysFromMdh = useCallback(async () => {
    await fetchAllSurveys();
  }, [fetchAllSurveys]);

  useEffect(() => {
    loadSurveysFromMdh();
  }, []);

  return (
    <div className='core-container mt-3'>
      <h1 className={styles.Title}>Active surveys</h1>
      {error ? (
        <div>There has been an error</div>
      ) : loading ? (
        <div>Loading surveys...</div>
      ) : (
        <SurveyList surveys={surveys} />
      )}
    </div>
  );
};
