import React from 'react';
import { CompContainer } from '../../../CompContainer';
import { AnswerItem } from '../AnswerItem';
import { ListGroup } from 'react-bootstrap';
import useSWR from 'swr';
import axios from 'axios';

export const QuestionItem = ({ question, surveyId, participantIds, order }) => {
  const questionText = `${order}. ${question.text}`;

  const fetcher = async ([url, params]) => {
    const { data } = await axios.get(url, { params });
    return data;
  };

  const params = {
    question_identifier: question.identifier,
    survey_id: surveyId,
    participant_ids: participantIds.join(','),
  };

  const {
    data: result,
    error,
    isLoading,
  } = useSWR(['/api/dev/re/surveys/overview', params], fetcher);

  const data = result?.data;

  const numResponse = data?.length ?? null;
  const numSkip = data
    ? data.filter((item) => item.content.answer_text.toLowerCase() === 'skip')
        .length
    : null;

  const responseText = getText('response', numResponse);
  const skipText = getText('skip', numSkip);

  const subText = `${responseText} - ${skipText}`;

  return (
    <CompContainer title={questionText} subtitle={subText}>
      {error ? (
        'Could not load responses.'
      ) : isLoading ? (
        'Loading...'
      ) : data.length > 0 ? (
        <ListGroup variant='flush' className='mt-3 border-top-0'>
          {data.map((d, key) => (
            <AnswerItem responseData={d} key={key} />
          ))}
        </ListGroup>
      ) : null}
    </CompContainer>
  );
};

const getText = (type, count) => {
  const plural = (num) => (num > 1 ? 's' : '');
  const text = count === null ? '...' : `${count} ${type}${plural(count)}`;
  return text;
};
