import dynamic from 'next/dynamic';

export const MultiSelect = dynamic(import('./MultiSelect'), {
  ssr: false,
  loading: () => <>Loading...</>,
});
