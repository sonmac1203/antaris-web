import { ActivityCardSkeleton } from '../../../ActivityCard';

export const ResponseListSkeleton = () => {
  const gapStyle = {
    gap: '2rem',
  };

  return (
    <div className='d-flex flex-column mt-3' style={gapStyle}>
      <ActivityCardSkeleton />
      <ActivityCardSkeleton />
      <ActivityCardSkeleton />
    </div>
  );
};
