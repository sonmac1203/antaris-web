import { ResponseListSkeleton, ErrorMessage } from './components';
import { ActivityCard } from '../ActivityCard';
import { useFilterBar } from '../../hooks';
import { memo } from 'react';

const ResponseList = () => {
  const { responses, error, loading } = useFilterBar();

  const gapStyle = {
    gap: '2rem',
  };

  return error ? (
    <ErrorMessage text='Could not load responses.' />
  ) : loading ? (
    <ResponseListSkeleton />
  ) : responses.length === 0 ? (
    <ErrorMessage text='No responses found.' />
  ) : (
    <div className='d-flex flex-column mt-3' style={gapStyle}>
      {responses.map((item, key) => (
        <ActivityCard item={item} key={key} />
      ))}
    </div>
  );
};

export default memo(ResponseList);
