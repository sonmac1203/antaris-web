import { useRef } from 'react';
import Link from 'next/link';
import { useSession } from '@/lib/re/session';
import { Form, Alert } from 'react-bootstrap';
import { AuthCardWrapper, InputField, SubmitButton } from '@/core/components';
import styles from './ResearcherSignInCard.module.css';

export const ResearcherSignInCard = () => {
  const serviceAccountIdRef = useRef(null);
  const passwordRef = useRef(null);

  const { loading, error, signInToServiceAccount } = useSession();

  const handleConnect = async (event) => {
    event.preventDefault();
    const credentials = {
      serviceAccountId: serviceAccountIdRef.current.value,
      password: passwordRef.current.value,
    };
    await signInToServiceAccount(credentials);
  };

  return (
    <AuthCardWrapper title='Sign In'>
      <Form onSubmit={handleConnect}>
        <InputField
          type='text'
          label='Service Account ID'
          controlId='serviceAccountIdInput'
          placeholder='e.g. RKStudio.12345678.project'
          inputRef={serviceAccountIdRef}
        />
        <InputField
          type='password'
          label='Password'
          controlId='passwordInput'
          placeholder='A strong password for Antaris'
          inputRef={passwordRef}
        />
        <SubmitButton
          loading={loading}
          defaultText='Sign in to Antaris'
          loadingText='Signing you in...'
        />
        {!loading && error && (
          <Alert key='alert' variant='danger' className='mt-3'>
            {error.message}
          </Alert>
        )}
      </Form>
      <div className={styles.FormFooter}>
        No account? <Link href='/re/signup'>Sign up</Link>
      </div>
    </AuthCardWrapper>
  );
};
