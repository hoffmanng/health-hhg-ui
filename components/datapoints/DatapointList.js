import { useContext } from 'react';
import { DatapointContext } from '../contexts/DatapointContext';
import { dateFormatter } from '../../lib/DateHelper';
import { FaTimes } from 'react-icons/fa';
import { constructValue } from '../../lib/DatapointHelper';

export default function DatapointList() {
    return (
        <div className="list-group mb-3">
            {[].map((row, i) => (
                <div key={`datapointItem-${i}`}
                    className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="me-2">
                        <span className="fs-5 fw-bold">
                            {constructValue(row.dataType, row.value)}
                        </span>
                    </div>
                    <div className="flex-grow-1">
                        <small>{row.unitOfMeasure}</small>
                    </div>
                    <div className="me-5">
                        {dateFormatter(row.createdAt).date} <small>{dateFormatter(row.createdAt).time}</small>
                    </div>
                    <div className="me-2">
                        <FaTimes style={{ cursor: 'pointer' }} onClick={() => deleteDatapoint(row._id)} />
                    </div>
                </div>
            ))}
        </div>
    );
};
