import Layout from '../components/Layout';
import DatapointList from '../components/datapoints/DatapointList';
import { useContext, useEffect, useReducer } from 'react';
import { UserContext } from '../components/contexts/UserContext';
import { checkLoggedIn } from '../lib/AuthHelper';
import useSWR, { mutate } from 'swr';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import AddDatapointCard from '../components/datapoints/AddDatapointCard';
import { getTypeDataFromQuery, DATA_TYPE } from '../lib/DatapointHelper';
import { DatapointContext } from '../components/contexts/DatapointContext';

const appReducer = (state, action) => {
    switch (action.type) {
        case 'deleteDatapoint':
            return {
                ...state,
                datapoints: state.datapoints.filter(item => item._id !== id)
            };
        case 'dataLoaded':
            return {
                ...state,
                datapoints: action.value
            };
        default:
            break;
    }
};

const initialState = {
    systolic: null,
    diastolic: null,
    weight: null,
    datapoints: [],
    isWeightValid: false,
    isSystolicValid: false,
    isDiastolicValid: false,
    error: ''
};

export default function Datapoints({ user }) {
    const router = useRouter();
    const [state, dispatch] = useReducer(appReducer, initialState);
    const { setUser } = useContext(UserContext);
    const currentPath = getTypeDataFromQuery(router.query);
    
    const baseUrl = 'http://localhost:3600/datapoints';
    const fullUrl = 
        !!router.query
        && router.query.hasOwnProperty('dataType')
        ? `${baseUrl}?dataType=${router.query.dataType}&limit=1000`
        : `${baseUrl}?limit=1000`;

    useEffect(() => {
        setUser(user);
        (async () => {
            const data = await fetch(fullUrl, { credentials: 'include' });
            const json = await data.json();
            dispatch({ type: 'dataLoaded', value: json.resources });
        })();
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
        <DatapointContext.Provider value={{ state, dispatch }}>
            <Layout title={currentPath.text}>
                {currentPath.dataType !== DATA_TYPE.ALL &&<AddDatapointCard />}
                <DatapointList />
            </Layout>
        </DatapointContext.Provider>
    );
};

export const getServerSideProps = async (ctx) => {
    const user = await checkLoggedIn(ctx);
    return { props: { user } };
};
