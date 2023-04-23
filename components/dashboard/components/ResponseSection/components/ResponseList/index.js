import dynamic from 'next/dynamic';
import { ResponseListSkeleton } from './components';

export const ResponseList = dynamic(import('./ResponseList'), {
  ssr: false,
  loading: () => <ResponseListSkeleton />,
});

export { ResponseListSkeleton } from './components';
