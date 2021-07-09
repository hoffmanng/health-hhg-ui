import { useEffect } from 'react';
import Layout from '../components/Layout';
import { checkLoggedIn } from '../lib/AuthHelper';
import MenuList from '../components/index/MenuList';
import UserCard from '../components/index/UserCard';
import { useStateStore } from '../components/stores/StateContext';

export default function Home({ user }) {
    const stateStore = useStateStore();

    useEffect(() => {
        stateStore.setUser(user);
    });
    
    return (
        <Layout title="Home">
            <UserCard />
            <MenuList />
        </Layout>
    );
}

export const getServerSideProps = async (ctx) => {
    const user = await checkLoggedIn(ctx);
    return { props: { user } };
};
