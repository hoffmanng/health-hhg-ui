import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SWRConfig } from 'swr';
import Script from 'next/script';
import Router from 'next/router';
import NProgress from 'nprogress';
import './global.css';
import '../public/bootstrap/css/bootstrap.min.css';
import 'nprogress/nprogress.css';
import { StateProvider } from '../components/stores/StateContext';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({Component, pageProps}) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="color-scheme" content="light dark" />
            </Head>
            <SWRConfig value={{ fetcher: (...args) => fetch(...args, { credentials: 'include' }).then(res => res.json()) }}>
                <StateProvider>
                    <Component {...pageProps} />
                </StateProvider>
            </SWRConfig>
            <Script src="bootstrap/js/bootstrap.bundle.min.js" />
        </>
    );
}
