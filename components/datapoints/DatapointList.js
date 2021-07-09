import { observer } from 'mobx-react';
import { useStateStore } from '../stores/StateContext';
import DatapointListItem from './DatapointListItem';

export default observer(function DatapointList() {
    const stateStore = useStateStore();

    return (
        <div className="list-group mb-3">
            {stateStore.datapoints.map((row, i) => (
                <DatapointListItem key={`datapointItem-${i}`} internalKey={`datapointItem-${i}`} row={row} />
            ))}
        </div>
    );
});
