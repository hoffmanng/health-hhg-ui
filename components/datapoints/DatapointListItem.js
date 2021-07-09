import { useStateStore } from '../stores/StateContext';
import NProgress from 'nprogress';
import { dbHelper } from '../../lib/DbHelper';
import { dateFormatter } from '../../lib/DateHelper';
import { FaTimes } from 'react-icons/fa';
import { constructValue } from '../../lib/DatapointHelper';

export default function DatapointListItem({ internalKey, row }) {
    const stateStore = useStateStore();

    const deleteDatapoint = async (id) => {
        NProgress.start();
        stateStore.removeDatapoint(id);
        dbHelper.removeDatapoint(id);
        NProgress.done();
    };

    return (
        <div key={internalKey} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="me-2">
                <span className="fs-5 fw-bold">
                    {constructValue(row.dataType, row.value)}
                </span>
            </div>
            <div className="flex-grow-1">
                <small>{row.unitOfMeasure}</small>
            </div>
            <div className="me-5">
                { !!row.createdAt ? dateFormatter(row.createdAt).date : '' } <small>{ !!row.createdAt ? dateFormatter(row.createdAt).time : ''}</small>
            </div>
            <div className="me-2">
                <FaTimes style={{ cursor: 'pointer' }} onClick={() => deleteDatapoint(row._id)} />
            </div>
        </div>
    );
};