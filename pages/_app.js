import '../styles/globals.css';
import { HomeLayout } from '../components/layouts';

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || HomeLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
