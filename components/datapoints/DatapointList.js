import DatapointListItem from './DatapointListItem';

export default function DatapointList({ data, deleteDatapoint }) {
    return (
        <div className="list-group">
            {(!!data && data.hasOwnProperty('resources') ? data.resources : []).map((row, i) => (
                <DatapointListItem key={`datapointItem-${i}`} data={row} deleteDatapoint={deleteDatapoint} />
            ))}
        </div>
    );
};
