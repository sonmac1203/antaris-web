import { AuthLayout } from '@/components/layouts';
import { ParticipantAuthCard } from '@/components/authorization';

const ParticipantSignInIndex = () => {
  return <ParticipantAuthCard type='signin' />;
};

ParticipantSignInIndex.Layout = AuthLayout;

export default ParticipantSignInIndex;
