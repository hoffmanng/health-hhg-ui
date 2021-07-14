import Layout from '../components/Layout';
import DatapointList from '../components/datapoints/DatapointList';
import { useEffect } from 'react';
import { checkLoggedIn } from '../lib/AuthHelper';
import useSWR, { mutate } from 'swr';
import { useRouter } from 'next/router';
import AddDatapointCard from '../components/datapoints/AddDatapointCard';
import { getTypeDataFromQuery } from '../lib/DatapointHelper';
import { useStateStore } from '../components/stores/StateContext';
import { observer } from 'mobx-react';

export default observer(function Datapoints({ user }) {
    const router = useRouter();
    const stateStore = useStateStore();
    const currentPath = getTypeDataFromQuery(router.query);
    
    useEffect(() => {
        stateStore.setUser(user);
        (async () => {
            await stateStore.refreshDatapoints(router.query.dataType);
        })();
    }, []);

    return (
        <Layout title={currentPath.text}>
            <AddDatapointCard />
            <DatapointList />
        </Layout>
    );
});

export const getServerSideProps = async (ctx) => {
    const user = await checkLoggedIn(ctx);
    return { props: { user } };
};
