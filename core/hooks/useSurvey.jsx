import { useContext } from 'react';
import { SurveyContext } from '../context';

export const useSurvey = () => useContext(SurveyContext);
