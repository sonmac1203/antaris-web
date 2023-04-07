import dynamic from 'next/dynamic';

export const ExportButton = dynamic(import('./ExportButton'), {
  ssr: false,
  loading: () => <>Loading...</>,
});
