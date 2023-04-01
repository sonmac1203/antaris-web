import { ListGroup } from 'react-bootstrap';
import styles from './QuestionListItem.module.css';

export const QuestionListItem = ({
  title,
  description,
  footerOne,
  footerTwo,
}) => {
  return (
    <ListGroup.Item as='li' className='d-flex py-3 gap-2'>
      <div className={styles.Main}>
        <div className={styles.Title}>{title}</div>
        <div className={styles.Description}>{description}</div>
        <div className={`d-flex align-items-center ${styles.Footer}`}>
          <div>
            <i className='fa-solid fa-list-ol me-1' />
            {footerOne}
          </div>
          ·
          <div>
            <i className='fa-regular fa-file me-1' />
            {footerTwo}
          </div>
        </div>
      </div>
    </ListGroup.Item>
  );
};
