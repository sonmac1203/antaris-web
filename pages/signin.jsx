import React from 'react';
import { SignInCard } from '@/components/authorization';
import { HomeLayout } from '@/components/layouts';

const SignInPage = () => {
  return <SignInCard />;
};

SignInCard.Layout = HomeLayout;

export default SignInPage;
