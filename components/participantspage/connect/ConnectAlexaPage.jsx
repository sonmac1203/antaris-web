import { LinkAlexaButton } from '@/core/components';

export const ConnectAlexaPage = ({
  data: { name, accountLinked, skillEnabled },
}) => {
  return (
    <div>
      <h1>Hi {name}</h1>
      <h3>Your account has {accountLinked ? 'already' : 'not'} been linked</h3>
      <h3>Your skill has {skillEnabled ? 'already' : 'not'} been enabled</h3>
      <LinkAlexaButton />
    </div>
  );
};