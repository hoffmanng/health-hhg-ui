import Layout from '../components/Layout';
import MyTable from '../components/Table';
import DatapointList from '../components/DatapointList';
import { useContext, useEffect } from 'react';
import { UserContext } from '../components/UserContext';
import { checkLoggedIn } from '../lib/authHelper';
import useSWR, { mutate } from 'swr';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';

export default function Datapoints({ user }) {
    const router = useRouter();
    const { setUser } = useContext(UserContext);
    const baseUrl = 'http://localhost:3600/datapoints';
    const fullUrl = 
        !!router.query
        && router.query.hasOwnProperty('dataType')
        ? `${baseUrl}?dataType=${router.query.dataType}`
        : baseUrl;
    const { data } = useSWR(fullUrl);

    useEffect(() => {
        setUser(user);
    }, []);

    const deleteDatapoint = async (id) => {
        NProgress.start();
        const newData = {...data, resources: data.resources.filter(item => item._id !== id)};
        mutate(fullUrl, newData, false);
        await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        mutate(fullUrl);
        NProgress.done();
    };

    return (
        <Layout title="Datapoints (SWR)">
            <DatapointList />
        </Layout>
    );
};

export const getServerSideProps = async (ctx) => {
    const user = await checkLoggedIn(ctx);
    return { props: { user } };
};
