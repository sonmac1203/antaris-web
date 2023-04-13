import { ListGroup } from 'react-bootstrap';
import { getFormattedDate } from '@/core/utils';
import styles from './ResponseItem.module.css';

export const ResponseItem = ({ item }) => {
  const { answer: answerData, questionText } = item;

  return (
    <ListGroup.Item as='li' className='d-flex gap-2 py-3 px-0'>
      <div className={styles.Main}>
        <div className={styles.ResponseTitle}>{questionText}</div>
        {answerData ? (
          <>
            <div className={styles.Description}>{answerData.answer_text}</div>
            <div
              className={`d-flex align-items-center ${styles.ResponseFooter}`}
            >
              <div>
                <i className='fa-regular fa-clock me-1' />
                {getFormattedDate(new Date(answerData.provided_at))}
              </div>
            </div>
          </>
        ) : (
          <>No answer recorded.</>
        )}
      </div>
    </ListGroup.Item>
  );
};
