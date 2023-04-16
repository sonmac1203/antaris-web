import { CompContainer } from '../CompContainer';
import { AnswerItem } from './components';
import { ListGroup } from 'react-bootstrap';

export const QuestionList = () => {
  return (
    <div className='d-flex flex-column gap-3'>
      <CompContainer
        title='1. What day of the week is it today?'
        subtitle='3 responses - 1 skip'
      >
        <ListGroup variant='flush' className='mt-3 border-top-0'>
          <AnswerItem />
          <AnswerItem />
          <AnswerItem />
        </ListGroup>
      </CompContainer>
      <CompContainer
        title='2. Which of the following is your favorite burger chain?'
        subtitle='3 responses'
      >
        <ListGroup variant='flush' className='mt-3 border-top-0'>
          <AnswerItem />
          <AnswerItem />
        </ListGroup>
      </CompContainer>
      <CompContainer
        title='3. One a scale of 1-10, how tired are you feeling today?'
        subtitle='3 responses'
      >
        <ListGroup variant='flush' className='mt-3 border-top-0'>
          <AnswerItem />
          <AnswerItem />
        </ListGroup>
      </CompContainer>
    </div>
  );
};
