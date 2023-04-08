import dynamic from 'next/dynamic';

export const DatePickerActivator = dynamic(import('./DatePickerActivator'), {
  ssr: false,
  loading: () => <>Loading...</>,
});
