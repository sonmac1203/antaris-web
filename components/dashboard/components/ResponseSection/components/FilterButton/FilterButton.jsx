import { useFilterBar } from '../../hooks';
import { Button } from 'react-bootstrap';

export const FilterButton = () => {
  const { filterResponses } = useFilterBar();

  const handleClick = (e) => {
    console.log('NOW CLICK');
    e.preventDefault();
    filterResponses();
  };

  return (
    <Button
      onClick={handleClick}
      className='btn btn-primary d-flex align-items-center gap-2'
    >
      <i className='fa-solid fa-filter' />
      Filter
    </Button>
  );
};
