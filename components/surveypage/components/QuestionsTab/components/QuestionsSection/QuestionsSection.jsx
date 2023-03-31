import { VersionSelect } from '../VersionSelect';
import { QuestionListItem } from '../QuestionListItem';

import { ListGroup } from 'react-bootstrap';

export const QuestionsSection = () => {
  return (
    <section>
      <VersionSelect />
      <h5 className='mb-3'>Imported at 3:00PM Mar 25</h5>
      <ListGroup as='ol' numbered>
        <QuestionListItem />
        <QuestionListItem />
      </ListGroup>
    </section>
  );
};
