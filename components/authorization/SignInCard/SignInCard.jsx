import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { InputField, SubmitButton } from '@/core/components/form';
import { colorTokens } from '@/core/design';
import styles from './SignInCard.module.css';

export const SignInCard = () => {
  const router = useRouter();

  const [signingIn, setSigningIn] = useState(false);
  const [idNumber, setIdNumber] = useState('');
  const [role, setRole] = useState('researcher');

  const inputFields = [
    {
      label: 'ID number',
      type: 'text',
      accept: null,
      name: 'participantID',
      id: 'participantID',
      callback: (e) => setIdNumber(e.target.value),
    },
  ];

  const onSignIn = async () => {
    setSigningIn(true);
    try {
      const response = await axios.post('/api/sign_in', {
        idNumber: idNumber,
        role: role,
      });
      if (response.data.success) {
        localStorage.setItem('auth_token', response.data.token);
        router.push('/dashboard');
      } else {
        console.log(response.data.message);
      }
    } catch (err) {
      const response = err.response;
      console.log(response.data);
    }
  };

  const getButtonContent = () => {
    if (!signingIn) {
      return 'Sign In';
    }
    return <i className='fa-solid fa-ellipsis' />;
  };

  return (
    <div className={styles.Container}>
      <p className={styles.CardTitleContainer}>
        <span className={styles.CardTitle}>Sign in </span>
        <span className={styles.CardSubtitle}>
          Or <Link href='/signup'>sign up</Link>
        </span>
      </p>
      {inputFields.map(({ label, type, accept, name, id, callback }, key) => (
        <InputField
          key={key}
          label={label}
          type={type}
          accept={accept}
          name={name}
          id={id}
          callback={callback}
        />
      ))}
      <div>
        <label htmlFor='role' className={styles.SelectLabel}>
          You are
        </label>
        <select
          name='role'
          id='role'
          className={styles.RoleSelect}
          defaultValue='researcher'
          onChange={(e) => setRole(e.target.value)}
        >
          <option value='researcher'>Researcher</option>
          <option value='participant'>Participant</option>
        </select>
      </div>
      <div className={styles.ButtonsContainer}>
        <SubmitButton
          text={getButtonContent()}
          color={colorTokens.pastelGreen}
          callback={onSignIn}
          disabled={idNumber.length === 0}
        />
      </div>
    </div>
  );
};
