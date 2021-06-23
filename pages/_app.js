import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../components/contexts/UserContext';
import { DatapointContext, defaultDatapointContext } from '../components/contexts/DatapointContext';
import { useState } from 'react';
import { SWRConfig } from 'swr';
import Script from 'next/script';
import Router from 'next/router';
import NProgress from 'nprogress';
import './global.css';
import '../public/bootstrap/css/bootstrap.min.css';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({Component, pageProps}) {
    const [dpContext, setDpContext] = useState(defaultDatapointContext);
    const [user , setUser] = useState(null);
    const userContextData = { user, setUser };
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="color-scheme" content="light dark" />
            </Head>
            <UserContext.Provider value={userContextData}>
                <DatapointContext.Provider value={{ dpContext, setDpContext }}>
                    <SWRConfig value={{ fetcher: (...args) => fetch(...args, { credentials: 'include' }).then(res => res.json()) }}>
                        <Component {...pageProps} />
                    </SWRConfig>
                </DatapointContext.Provider>
            </UserContext.Provider>
            <Script src="bootstrap/js/bootstrap.bundle.min.js" />
        </>
    );
}
