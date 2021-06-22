import { useContext, useEffect } from 'react';
import { UserContext } from '../components/UserContext';
import Layout from '../components/Layout';
import { checkLoggedIn } from '../lib/authHelper';
import MenuList from '../components/MenuList';
import UserCard from '../components/UserCard';

export default function Home({ user }) {
    const { setUser } = useContext(UserContext);
    useEffect(() => {
        setUser(user);
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
