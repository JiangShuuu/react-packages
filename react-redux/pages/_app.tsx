import '~/styles/globals.css';
import type { AppProps } from 'next/app';
import store from '~/store/store';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <p>sda</p>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
