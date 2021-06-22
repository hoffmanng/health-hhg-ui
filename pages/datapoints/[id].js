import Layout from '../../components/Layout';

import { useRouter } from 'next/router';

export default function Datapoint() {
    const router = useRouter();
    return (
        <Layout title={`Datapoint/${router.query.id}`}>
        </Layout>
    );
}