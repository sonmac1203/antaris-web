import { ParticipantContext } from '../context/';
import { useContext } from 'react';

export const useParticipant = () => {
  const participantContext = useContext(ParticipantContext);
  return participantContext;
};
