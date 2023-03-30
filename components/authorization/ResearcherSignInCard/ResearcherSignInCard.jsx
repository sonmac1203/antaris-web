import Link from 'next/link';
import { Form } from 'react-bootstrap';
import { AuthCardWrapper, InputField, SubmitButton } from '@/core/components';
import styles from './ResearcherSignInCard.module.css';

export const ResearcherSignInCard = () => {
  return (
    <AuthCardWrapper title='Sign In'>
      <Form>
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
        <SubmitButton
          loading={false}
          defaultText='Sign in to Antaris'
          loadingText='Signing you in...'
        />
      </Form>
      <div className={styles.FormFooter}>
        No account? <Link href='/researcher/signup'>Sign up</Link>
      </div>
    </AuthCardWrapper>
  );
};
