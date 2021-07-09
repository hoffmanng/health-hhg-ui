import { useRouter } from 'next/router';
import { getTypeDataFromQuery, DATA_TYPE } from '../../lib/DatapointHelper';
import AddWeightInputGroup from './AddWeightInputGroup';
import AddBloodPressureInputGroup from './AddBloodPressureInputGroup';

export default function AddDatapointCard() {
    const router = useRouter();
    const currentPath = getTypeDataFromQuery(router.query);

    if (currentPath.dataType === DATA_TYPE.ALL) return null;

    return (
        <div className="accordion mb-3" id="addNewDatapointAccordion">
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button collapsed bg-primary bg-gradient text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Add {currentPath.text}
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#addNewDatapointAccordion">
                    <div className="accordion-body bg-light bg-gradient">
                        { currentPath.dataType === DATA_TYPE.WEIGHT && <AddWeightInputGroup /> }
                        { currentPath.dataType === DATA_TYPE.BLOOD_PRESSURE && <AddBloodPressureInputGroup /> }
                    </div>
                </div>
            </div>
        </div>
    );
};
