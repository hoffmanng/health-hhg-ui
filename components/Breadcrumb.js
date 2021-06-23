import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../components/contexts/UserContext';
import { getPathDescription } from '../lib/DatapointHelper';

export default function Breadcrumb() {
    const router = useRouter();
    const pathDescription = getPathDescription(router);
    const { user } = useContext(UserContext);
    if (!user) return null;

    const subPageDom = !!pathDescription && (
        <li className="breadcrumb-item active" aria-current="page">{pathDescription}</li>
    );
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link href="/">
                        <a href="#">Home</a>
                    </Link>
                </li>
                {subPageDom}
            </ol>
        </nav>
    );
};
