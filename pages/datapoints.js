import Layout from '../components/Layout';
import DatapointList from '../components/datapoints/DatapointList';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../components/contexts/UserContext';
import { checkLoggedIn } from '../lib/AuthHelper';
import useSWR, { mutate } from 'swr';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import AddDatapointCard from '../components/datapoints/AddDatapointCard';
import { getTypeDataFromQuery, getFormattedValueFromQuery } from '../lib/DatapointHelper';
import { DatapointContext } from '../components/contexts/DatapointContext';

export default function Datapoints({ user }) {
    const router = useRouter();
    const { setUser } = useContext(UserContext);
    const [dpContext, setDpContext] = useState();
    
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

    const addDatapoint = async () => {
        NProgress.start();
        const { dataType, unitOfMeasure } = getTypeDataFromQuery(router.query);
        const value = getFormattedValueFromQuery(router.query);
        const newEntry = { dataType, unitOfMeasure, value };
        const newResources = [...data.resources, newEntry];
        const newData = {...data, resources: newResources};
        mutate(fullUrl, newData, false);
        await fetch(`${baseUrl}/${id}`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(newEntry)
        });
        mutate(fullUrl);
        NProgress.done();
    };

    return (
        <DatapointContext.Provider value={{ dpContext, setDpContext }}>
            <Layout title="Datapoints (SWR)">
                <AddDatapointCard addDatapoint={addDatapoint} />
                <DatapointList data={data} deleteDatapoint={deleteDatapoint} />
            </Layout>
        </DatapointContext.Provider>
    );
};

export const getServerSideProps = async (ctx) => {
    const user = await checkLoggedIn(ctx);
    return { props: { user } };
};
