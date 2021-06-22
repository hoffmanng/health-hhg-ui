import { useRouter } from 'next/router';
import { getTypeFromQuery } from '../../lib/DatapointHelper';

export default function AddEntry({ addDatapoint }) {
    const router = useRouter();
    const type = getTypeFromQuery(router.query);
    console.log(type);

    const addWeightInputGroup = (
        <div className="input-group">
            <span className="input-group-text" id="weight-input">Weight</span>
            <input type="number" className="form-control" placeholder="" aria-label="Weight" aria-describedby="weight-input" />
            <button className="btn btn-outline-primary px-5" type="button" id="weight-add-button">Add</button>
        </div>
    );

    const addBloodPressureInputGroup = (
        <div className="input-group">
            <span className="input-group-text" id="weight-input">Systolic</span>
            <input type="number" className="form-control" placeholder="" aria-label="Weight" aria-describedby="weight-input" />
            <span className="input-group-text" id="weight-input">Diastolic</span>
            <input type="number" className="form-control" placeholder="" aria-label="Weight" aria-describedby="weight-input" />
            <button className="btn btn-outline-primary px-5" type="button" id="weight-add-button">Add</button>
        </div>
    );

    if (type === 'blood_pressure') {
        return addBloodPressureInputGroup;
    }
    if (type === 'weight') {
        return addWeightInputGroup;
    }
    return null;
};
