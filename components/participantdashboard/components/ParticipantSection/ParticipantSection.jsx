import { PageSectionWrapper } from '@/core/components';
import {
  AddParticipantButton,
  Provider,
  CurrentParticipantsList,
  DeleteParticipantButton,
  LinkParticipantButton,
  SaveParticipantButton,
} from './components';
import { useParticipantDashboard } from '@/lib/pa/dashboard';
import { useState } from 'react';

export const ParticipantSection = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const startRefreshing = () => setRefreshKey((oldKey) => oldKey + 1);

  const {
    participantData: { accountLinked, skillEnabled },
  } = useParticipantDashboard();

  const skillIsReady = accountLinked && skillEnabled;

  return (
    <PageSectionWrapper title='Added participants'>
      <Provider value={{ startRefreshing, refreshKey }}>
        <CurrentParticipantsList />
        <div className='d-flex gap-3 align-items-center'>
          <AddParticipantButton />
          <DeleteParticipantButton />
        </div>
        <div className='d-flex justify-content-center'>
          {!skillIsReady ? (
            <LinkParticipantButton />
          ) : (
            <SaveParticipantButton />
          )}
        </div>
      </Provider>
    </PageSectionWrapper>
  );
};
