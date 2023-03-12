import { useContext } from 'react';
import { CredentialsContext } from '../context';

export const useCredentials = () => useContext(CredentialsContext);
