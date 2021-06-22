import Table from 'react-bootstrap/Table';
import { FaTrashAlt } from 'react-icons/fa';

export default function MyTable({ data, deleteDatapoint }) {
    console.log(data);
    const tbody = (!!data && data.hasOwnProperty('resources') ? data.resources : []).map((row, i) => {
        const valueWithUom = row.dataType === 'blood_pressure'
            ? `${row.value.systolic}/${row.value.diastolic} ${row.unitOfMeasure}`
            : `${row.value} ${row.unitOfMeasure}`;
        return (<tr key={`row-${i}`}>
            <td>{row._id}</td>
            <td>{row.dataType}</td>
            <td>{valueWithUom}</td>
            <td>{row.createdAt}</td>
            <td><FaTrashAlt style={{ cursor: 'pointer' }} onClick={() => deleteDatapoint(row._id)} /></td>
        </tr>);
    });
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>id</th>
                    <th>dataType</th>
                    <th>value</th>
                    <th>createdAt</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>{tbody}</tbody>
        </Table>
    );
};
