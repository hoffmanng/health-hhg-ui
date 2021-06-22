import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../components/contexts/UserContext';

export default function Breadcrumb({ subPage }) {
    const { user } = useContext(UserContext);
    if (!user) return null;

    const subPageDom = !!subPage && subPage !== 'Home' && (
        <li className="breadcrumb-item active" aria-current="page">{subPage}</li>
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
