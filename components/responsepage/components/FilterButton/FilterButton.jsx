import { Button } from 'react-bootstrap';
import { useResponse } from '@/core/hooks';

export const FilterButton = ({ startRefreshing }) => {
  const { filterResponses, loading } = useResponse();

  const handleClick = (e) => {
    e.preventDefault();
    filterResponses(() => startRefreshing());
  };

  return (
    <Button
      onClick={handleClick}
      className='btn btn-primary d-flex align-items-center gap-2'
    >
      <i className='fa-solid fa-filter' />
      {loading ? 'Filtering...' : 'Filter'}
    </Button>
  );
};
