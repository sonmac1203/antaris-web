import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HomeLayout } from '../components/layouts';
import { AppContextProvider, SessionRefreshTimer } from '@/components/app';

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || HomeLayout;

  return (
    <AppContextProvider>
      <Layout>
        <SessionRefreshTimer />
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}

export default MyApp;
