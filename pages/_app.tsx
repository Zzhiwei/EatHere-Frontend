import type { AppProps } from 'next/app';

import '../styles/globals.css';
import Layout from '../components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer
          position="top-center"
          draggable={false}
          pauseOnHover={false}
          theme="colored"
          newestOnTop
          closeOnClick
        />
      </Layout>
    </>
  );
}

export default MyApp;
