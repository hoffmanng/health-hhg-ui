import { FaTrashAlt } from 'react-icons/fa';
import DPValueFormatter from '../formatters/DPValueFormatter';
import { dateFormatter } from '../../lib/DateHelper';

export default function DatapointListItem({ data, deleteDatapoint }) {
    const { date, time } = dateFormatter({ date: data.createdAt });
    return (
        <div className="list-group-item d-flex justify-content-between align-items-center">
            <div className="me-2">
                <span className="fs-5 fw-bold">
                    <DPValueFormatter type={data.dataType} value={data.value} />
                </span>
            </div>
            <div className="flex-grow-1">
                <small>{data.unitOfMeasure}</small>
            </div>
            <div className="me-5">
                {date} <small>{time}</small>
            </div>
            <div className="me-2">
                <FaTrashAlt style={{ cursor: 'pointer' }} onClick={() => deleteDatapoint(data._id)} />
            </div>
        </div>
    );
};
