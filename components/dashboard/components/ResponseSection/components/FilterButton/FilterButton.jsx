import { useFilterBar } from '../../hooks';
import { Button } from 'react-bootstrap';
import styles from './FilterButton.module.css';

export const FilterButton = () => {
  const { filterResponses } = useFilterBar();

  const handleClick = (e) => {
    e.preventDefault();
    filterResponses();
  };

  return (
    <Button
      onClick={handleClick}
      className={`btn btn-primary d-flex align-items-center gap-2 ${styles.Style}`}
    >
      <i className='fa-solid fa-filter' />
      Apply
    </Button>
  );
};
