import Link from 'next/link';
import { Form } from 'react-bootstrap';
import {
  AuthCardWrapper,
  InputField,
  TextareaField,
  SubmitButton,
} from '@/core/components';
import styles from './ResearcherSignUpCard.module.css';

export const ResearcherSignUpCard = () => {
  const privateKeyInputPlaceholder = `-----BEGIN RSA PRIVATE KEY-----
...
...
-----END RSA PRIVATE KEY-----`;
  return (
    <AuthCardWrapper title='Sign up'>
      <Form>
        <InputField
          type='text'
          label='Project ID'
          controlId='projectIdInput'
          placeholder='Project ID from MyDataHelps'
        />
        <InputField
          type='text'
          label='Service Account ID'
          controlId='serviceAccountIdInput'
          placeholder='e.g. RKStudio.12345678.project'
        />
        <InputField
          type='password'
          label='Password'
          controlId='passwordInput'
          placeholder='A strong password for Antaris'
        />
        <TextareaField
          label='Private key'
          controlId='privateKeyInput'
          placeholder={privateKeyInputPlaceholder}
        />

        <SubmitButton
          loading={false}
          defaultText='Sign up with Antaris'
          loadingText='Signing you up...'
        />
      </Form>
      <div className={styles.FormFooter}>
        Already registered? <Link href='/researcher/signin'>Sign in</Link>
      </div>
    </AuthCardWrapper>
  );
};
