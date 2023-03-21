import { LinkAlexaButton } from '@/core/components';

export const ConnectAlexaPage = ({
  data: { name, accountLinked, skillEnabled },
}) => {
  const skillIsReady = accountLinked && skillEnabled;

  return (
    <div>
      <a href='/api/auth/sign_out'>
        <button>Sign out</button>
      </a>
      <h1>Hi {name}</h1>
      <h3>Your account has {accountLinked ? 'already' : 'not'} been linked</h3>
      <h3>Your skill has {skillEnabled ? 'already' : 'not'} been enabled</h3>
      {!skillIsReady ? (
        <LinkAlexaButton />
      ) : (
        <div>Delete the skill and unlink your account</div>
      )}
    </div>
  );
};
