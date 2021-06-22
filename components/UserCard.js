import { useRouter } from 'next/router';
import Link from 'next/link';

export default function UserCard() {
    const router = useRouter();

    const logout = async () => {
        const result = await fetch('http://localhost:3600/logout', {
            method: 'POST',
            credentials: 'include'
        });
        if (result.status === 200) {
            router.push('/login');
        }
    };
    
    return (
        <div className="card text-white bg-primary mb-3">
            <div className="card-body d-flex justify-content-between">
                <div>User: hhg</div>
                <div>
                    <a href="#" onClick={logout} className="link-light">Log out</a>
                </div>
            </div>
        </div>
    );
};