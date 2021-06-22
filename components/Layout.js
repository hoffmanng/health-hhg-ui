import Head from "next/head";
import Breadcrumb from "./Breadcrumb";
import Header from './Header';

export default function Layout({ children, title }) {
    const siteName = "Health-HHG";
    const fullTitle = title ? `${title} - ${siteName}` : siteName;
    return (
        <>    
            <Head>
                <title>{fullTitle}</title>
            </Head>
            <div className="container-md">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <Header title={`${siteName}`} />
                        <Breadcrumb subPage={title} />
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};
