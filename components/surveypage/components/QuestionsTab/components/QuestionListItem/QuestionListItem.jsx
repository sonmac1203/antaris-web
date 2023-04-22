import { ListGroup } from 'react-bootstrap';
import styles from './QuestionListItem.module.css';

export const QuestionListItem = ({ title, description, type }) => {
  return (
    <ListGroup.Item as='li' className='d-flex py-3 gap-2'>
      <div className={styles.Main}>
        <div className='d-flex align-items-center gap-2'>
          <div className='fs-6' style={{ fontWeight: '500' }}>
            {title}
          </div>
          <div className='text-secondary' style={{ fontSize: '12px' }}>
            {type}
          </div>
        </div>
        <div className={`${styles.Description} text-primary-emphasis`}>
          {description}
        </div>
      </div>
    </ListGroup.Item>
  );
};
