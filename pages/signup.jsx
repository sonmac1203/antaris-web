import React from 'react';
import { SignUpCard } from '@/components/authorization';
import { HomeLayout } from '@/components/layouts';

const SignUpPage = () => {
  return <SignUpCard />;
};

SignUpCard.Layout = HomeLayout;

export default SignUpPage;
