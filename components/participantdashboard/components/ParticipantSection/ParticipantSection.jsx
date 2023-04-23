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
import { useSWRAxios } from '@/core/hooks';

export const ParticipantSection = () => {
  const {
    participantData: { accountLinked, skillEnabled, email },
  } = useParticipantDashboard();

  const skillIsReady = accountLinked && skillEnabled;

  const {
    data: result,
    loading,
    error,
    mutate,
  } = useSWRAxios(['/api/dev/amz/participants', { email }]);

  return (
    <PageSectionWrapper title='Added participants'>
      <Provider
        value={{
          startRefreshing: mutate,
          currentParticipants: result?.data || [],
          loading,
          error,
        }}
      >
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
