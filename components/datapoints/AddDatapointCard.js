import { useRouter } from 'next/router';
import { getTypeDataFromQuery } from '../../lib/DatapointHelper';
import AddEntry from './AddEntry';

export default function AddDatapointCard({ addDatapoint }) {
    const router = useRouter();
    const { text: dataTypeText } = getTypeDataFromQuery(router.query);

    return (
        <div className="accordion mb-3" id="addNewDatapointAccordion">
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button collapsed bg-primary text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Add {dataTypeText}
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#addNewDatapointAccordion">
                    <div className="accordion-body bg-light bg-gradient">
                        <AddEntry addDatapoint={addDatapoint} />
                    </div>
                </div>
            </div>
        </div>
    );
};
