import '../styles/globals.css';
import { useEffect } from 'react';
import { HomeLayout } from '../components/layouts';
import { AppContextProvider } from '@/components/app';
import { useAuth } from '@/core/hooks';
import { useRouter } from 'next/router';
import { getRegexFromPaths } from '@/core/utils';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || HomeLayout;

  const { asPath: path } = useRouter();

  console.log(path);

  const unprotectedPaths = ['/', '/login'];
  const protectedPaths = ['/dash/*'];

  const unprotectedRegex = getRegexFromPaths(unprotectedPaths);
  const protectedRegex = getRegexFromPaths(protectedPaths);

  const { loading, error, verifyAuthentication, isAuthenticated, authData } =
    useAuth();

  useEffect(() => {
    (async () => {
      await verifyAuthentication();
    })();
  }, []);

  console.log({ loading, error });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  if (isAuthenticated && unprotectedRegex.test(path)) {
    return <div>Please return to dash. You have been authenticated.</div>;
  }

  if (!isAuthenticated && protectedRegex.test(path)) {
    return <div>You are not authorized. Please log in first.</div>;
  }

  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}

export default MyApp;
