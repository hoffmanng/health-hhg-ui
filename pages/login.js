import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { checkLoggedIn } from '../lib/AuthHelper';

export default function Login({ user }) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (!!user && !!user.email) {
            router.push('/');
        }
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3600/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });
            if (response.status === 200) {
                router.push('/');
            }
        } catch(e) {
            console.log(e);
        }
    };
    
    return (
        <Layout title="Login">
            <div className="row d-flex justify-content-center">
                <div className="col-6">
                    <form onSubmit={submit}>
                        <div className="form-floating">
                            <input type="text" className="form-control" placeholder="." onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mt-1">
                            <input type="password" className="form-control" placeholder="." onChange={e => setPassword(e.target.value)} />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Sign in</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export const getServerSideProps = async (ctx) => {
    const user = await checkLoggedIn(ctx);
    return { props: { user } };
};