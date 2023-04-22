import dynamic from 'next/dynamic';
import { ResponseSectionMainSkeleton } from './components';

export const ResponseSectionMain = dynamic(import('./ResponseSectionMain'), {
  ssr: false,
  loading: () => <ResponseSectionMainSkeleton />,
});
