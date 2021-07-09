import Link from 'next/link';
import { useRouter } from 'next/router';
import { getPathDescription } from '../lib/DatapointHelper';
import { useStateStore } from './stores/StateContext';
import { observer } from 'mobx-react';

export default observer(function Breadcrumb() {
    const router = useRouter();
    const pathDescription = getPathDescription(router);
    const stateStore = useStateStore();
    
    // if (!stateStore.user) return null;

    const subPageDom = !!pathDescription && (
        <li className="breadcrumb-item active" aria-current="page">{pathDescription} ({ stateStore.datapointCount })</li>
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
});
