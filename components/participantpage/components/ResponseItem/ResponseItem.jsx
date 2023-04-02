import { ListGroup } from 'react-bootstrap';
import { formatDate } from '@/core/utils';
import styles from './ResponseItem.module.css';

export const ResponseItem = ({ item }) => {
  return (
    <ListGroup.Item as='li' className='d-flex gap-2 py-3 px-0'>
      <div className={styles.Main}>
        <div className={styles.ResponseTitle}>{item.questionText}</div>
        {item.answer ? (
          <>
            <div className={styles.Description}>{item.answer.text}</div>
            <div
              className={`d-flex align-items-center ${styles.ResponseFooter}`}
            >
              <div>
                <i className='fa-regular fa-clock me-1' />
                {formatDate(new Date(item.answer.provided_at))}
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
