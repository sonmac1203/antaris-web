import { AuthLayout } from '@/components/layouts';
import { ParticipantAuthCard } from '@/components/authorization';

const ParticipantSignUpIndex = () => {
  return <ParticipantAuthCard type='signup' />;
};

ParticipantSignUpIndex.Layout = AuthLayout;

export default ParticipantSignUpIndex;
