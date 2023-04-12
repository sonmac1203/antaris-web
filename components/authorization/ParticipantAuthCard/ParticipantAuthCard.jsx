import React from 'react';
import { AuthCardWrapper, LoginWithAmazonButton } from '@/core/components';

export const ParticipantAuthCard = ({ type }) => {
  const title = type === 'signin' ? 'Sign in' : 'Sign up';
  const buttonText = `${title} with Amazon`;

  return (
    <AuthCardWrapper title={title}>
      <p className='mb-4'>
        To ensure the security of your account, we only support the option
        below. Continue with your Amazon account.
      </p>
      <LoginWithAmazonButton buttonText={buttonText} />
    </AuthCardWrapper>
  );
};
