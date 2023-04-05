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
        <div className={`${styles.Title}`}>{title}</div>
        <div className={`${styles.Description} text-primary-emphasis mb-2`}>
          {description}
        </div>
        <div className='d-flex align-items-center gap-2'>
          <div className={`text-secondary fs-6 ${styles.Footer}`}>
            <i className='fa-solid fa-list-ol me-1' />
            {footerOne}
          </div>
          ·
          <div className={`text-secondary fs-6 ${styles.Footer}`}>
            <i className='fa-regular fa-file me-1' />
            {footerTwo}
          </div>
        </div>
      </div>
    </ListGroup.Item>
  );
};
