import Layout from '../components/Layout';
import MyTable from '../components/Table';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../components/UserContext';
import { checkLoggedIn } from '../lib/authHelper';
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
    const [data, setData] = useState([]);

    useEffect(() => {
        setUser(user);
        (async () => {
            const datapoints = await fetchDatapoints();
            console.log(datapoints);
            setData(datapoints);
        })();
    }, []);

    const fetchDatapoints = async () => {
        NProgress.start();
        try {
            const result = await fetch(fullUrl, {
                method: 'GET',
                credentials: 'include'
            });
            const json = await result.json();
            NProgress.done();
            return json || [];
        } catch (e) {
            console.log(e);
            NProgress.done();
        }
    };

    const deleteDatapoint = async (id) => {
        NProgress.start();
        const newData = {...data, resources: data.resources.filter(item => item._id !== id)};
        setData(newData);
        await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        await fetchDatapoints();
        NProgress.done();
    };

    return (
        <Layout title="Datapoints (state)">
            <MyTable data={data} deleteDatapoint={deleteDatapoint} />
        </Layout>
    );
};

export const getServerSideProps = async (ctx) => {
    const user = await checkLoggedIn(ctx);
    return { props: { user } };
};
