import dynamic from 'next/dynamic';
import { PageSectionWrapper } from '@/core/components';
import { ResponseListSkeleton } from './components/ResponseList';
import { FilterBarSkeleton } from './components/FilterBar';

export const ResponseSection = dynamic(import('./ResponseSection'), {
  ssr: false,
  loading: () => (
    <PageSectionWrapper title='Responses'>
      <FilterBarSkeleton />
      <ResponseListSkeleton />
    </PageSectionWrapper>
  ),
});
