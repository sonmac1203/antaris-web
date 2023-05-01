import dynamic from 'next/dynamic';
export const Dashboard = dynamic(import('./Dashboard'), {
  ssr: true,
});
