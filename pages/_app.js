import '../styles/globals.css';
import '../styles/nprogress.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useEffect } from 'react';
import { HomeLayout } from '../components/layouts';
import { SessionRefreshTimer } from '@/components/app';
import { useRouter } from 'next/router';
import SSRProvider from 'react-bootstrap/SSRProvider';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const handleRouteStart = () => NProgress.start();
  const handleRouteDone = () => NProgress.done();

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteStart);
    router.events.on('routeChangeComplete', handleRouteDone);
    router.events.on('routeChangeError', handleRouteDone);

    return () => {
      router.events.off('routeChangeStart', handleRouteStart);
      router.events.off('routeChangeComplete', handleRouteDone);
      router.events.off('routeChangeError', handleRouteDone);
    };
  }, []);

  const Layout = Component.Layout || HomeLayout;

  return (
    <SSRProvider>
      <Layout {...pageProps}>
        <SessionRefreshTimer />
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>
  );
}

export default MyApp;
