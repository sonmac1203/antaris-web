import dynamic from 'next/dynamic';

export const DatePicker = dynamic(import('./DatePicker'), {
  ssr: false,
  loading: () => <>Loading...</>,
});
