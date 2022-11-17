import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { InputField, SubmitButton } from '@/core/components/form';
import { colorTokens } from '@/core/design';
import styles from './SignUpCard.module.css';

export const SignUpCard = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [role, setRole] = useState('researcher');
  const [signingUp, setSigningUp] = useState(false);

  const inputFields = [
    {
      label: 'Name',
      type: 'text',
      accept: null,
      name: 'name',
      id: 'name',
      callback: (e) => setName(e.target.value),
    },
    {
      label: 'ID number',
      type: 'text',
      accept: null,
      name: 'idNumber',
      id: 'idNumber',
      callback: (e) => setIdNumber(e.target.value),
    },
  ];

  const onSignUp = async () => {
    setSigningUp(true);
    const response = await axios.post('/api/create_user', {
      name: name,
      idNumber: idNumber,
      role: role,
    });
    if (response.data.success) {
      router.push('/');
    }
  };

  const getButtonContent = () => {
    if (!signingUp) {
      return 'Sign Up';
    }
    return <i className='fa-solid fa-ellipsis' />;
  };

  return (
    <div className={styles.Container}>
      <p className={styles.CardTitleContainer}>
        <span className={styles.CardTitle}>Sign up </span>
        <span className={styles.CardSubtitle}>
          Or <Link href='/'>sign in</Link>
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
          callback={onSignUp}
          disabled={name.length * idNumber.length === 0}
        />
      </div>
    </div>
  );
};
