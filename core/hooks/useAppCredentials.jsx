import { useContext } from 'react';
import { AppContext } from '../context';

export const useAppCredentials = () => useContext(AppContext);
