import { useCallback, useEffect } from 'react';
import { useMdh } from '@/core/hooks';
import { SurveyList, ParticipantList } from './components';
import styles from './Dash.module.css';

export const Dash = () => {
  const {
    loading,
    error,
    surveys,
    fetchAllSurveys,
    participantLoading,
    participantError,
    participants,
    fetchAllParticipants,
  } = useMdh();

  const loadSurveysFromMdh = useCallback(async () => {
    await Promise.all([fetchAllSurveys(), fetchAllParticipants()]);
  }, [fetchAllSurveys]);

  useEffect(() => {
    loadSurveysFromMdh();
  }, []);

  return (
    <div className='core-container d-flex flex-column gap-5 mb-5'>
      <section>
        <h1 className={styles.Title}>Active surveys</h1>
        <h2 className={styles.Subtitle}>
          Click on each survey to view details
        </h2>
        {error ? (
          <div>There has been an error</div>
        ) : loading ? (
          <div>Loading surveys...</div>
        ) : (
          <SurveyList surveys={surveys} />
        )}
      </section>
      <section>
        <h1 className={styles.Title}>Participants</h1>
        <h2 className={styles.Subtitle}>
          Click on each participant to view details
        </h2>
        {participantError ? (
          <div>There has been an error</div>
        ) : participantLoading ? (
          <div>Loading participants...</div>
        ) : (
          <ParticipantList participants={participants} />
        )}
      </section>
    </div>
  );
};
