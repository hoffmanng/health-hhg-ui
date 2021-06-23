import Layout from '../components/Layout';
import DatapointList from '../components/datapoints/DatapointList';
import { useContext, useEffect } from 'react';
import { UserContext } from '../components/contexts/UserContext';
import { checkLoggedIn } from '../lib/AuthHelper';
import useSWR, { mutate } from 'swr';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import AddDatapointCard from '../components/datapoints/AddDatapointCard';
import { getTypeDataFromQuery, DATA_TYPE } from '../lib/DatapointHelper';
import { DatapointContext } from '../components/contexts/DatapointContext';

export default function Datapoints({ user }) {
    const router = useRouter();
    const { setUser } = useContext(UserContext);
    const { dpContext, setDpContext } = useContext(DatapointContext);
    const currentPath = getTypeDataFromQuery(router.query);
    
    const baseUrl = 'http://localhost:3600/datapoints';
    const fullUrl = 
        !!router.query
        && router.query.hasOwnProperty('dataType')
        ? `${baseUrl}?dataType=${router.query.dataType}&limit=1000`
        : `${baseUrl}?limit=1000`;
    const { data } = useSWR(fullUrl);

    useEffect(() => {
        setUser(user);
        setDpContext({...dpContext, datapoints: data, deleteDatapoint, addDatapoint});
    }, [user, data, dpContext?.weight, dpContext?.systolic, dpContext?.diastolic]);

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
        let value;
        if (dataType === 'blood_pressure') {
            value = { systolic: dpContext.systolic, diastolic: dpContext.diastolic };
        }
        if (dataType === 'weight') {
            value = dpContext.weight;
        }
        const newEntry = { dataType, unitOfMeasure, value };
        const newData = {...data, resources: [newEntry, ...data.resources]};
        mutate(fullUrl, newData, false);
        await fetch(baseUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEntry)
        });
        mutate(fullUrl);
        NProgress.done();
    };

    return (
        <Layout title={currentPath.text}>
            {currentPath.dataType !== DATA_TYPE.ALL &&<AddDatapointCard />}
            <DatapointList />
        </Layout>
    );
};

export const getServerSideProps = async (ctx) => {
    const user = await checkLoggedIn(ctx);
    return { props: { user } };
};
