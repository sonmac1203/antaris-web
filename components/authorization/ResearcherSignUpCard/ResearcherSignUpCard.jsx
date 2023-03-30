import { useRef } from 'react';
import Link from 'next/link';
import { Form, Alert } from 'react-bootstrap';
import {
  AuthCardWrapper,
  InputField,
  TextareaField,
  SubmitButton,
} from '@/core/components';
import { useSession } from '@/core/hooks';
import styles from './ResearcherSignUpCard.module.css';

export const ResearcherSignUpCard = () => {
  const privateKeyInputPlaceholder = `-----BEGIN RSA PRIVATE KEY-----
...
...
-----END RSA PRIVATE KEY-----`;

  const { loading, error, signUpWithServiceAccount } = useSession();

  const projectIdRef = useRef(null);
  const serviceAccountIdRef = useRef(null);
  const passwordRef = useRef(null);
  const privateKeyRef = useRef(null);

  const handleConnect = async (event) => {
    event.preventDefault();
    const credentials = {
      projectId: projectIdRef.current.value,
      serviceAccountId: serviceAccountIdRef.current.value,
      password: passwordRef.current.value,
      privateKey: privateKeyRef.current.value,
    };
    await signUpWithServiceAccount(credentials);
  };

  return (
    <AuthCardWrapper title='Sign up'>
      <Form onSubmit={handleConnect}>
        <InputField
          type='text'
          label='Project ID'
          controlId='projectIdInput'
          placeholder='Project ID from MyDataHelps'
          inputRef={projectIdRef}
        />
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
        <TextareaField
          label='Private key'
          controlId='privateKeyInput'
          placeholder={privateKeyInputPlaceholder}
          inputRef={privateKeyRef}
        />
        <SubmitButton
          loading={loading}
          defaultText='Sign up with Antaris'
          loadingText='Signing you up...'
        />
        {!loading && error && (
          <Alert key='alert' variant='danger' className='mt-3'>
            {error.message}
          </Alert>
        )}
      </Form>
      <div className={styles.FormFooter}>
        Already registered? <Link href='/researcher/signin'>Sign in</Link>
      </div>
    </AuthCardWrapper>
  );
};
