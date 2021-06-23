import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { getTypeFromQuery, DATA_TYPE } from '../../lib/DatapointHelper';
import { DatapointContext } from '../contexts/DatapointContext';

export default function AddEntry() {
    const router = useRouter();
    const type = getTypeFromQuery(router.query);
    const { dpContext, setDpContext } = useContext(DatapointContext);
    const [systolic, setSystolic] = useState();
    const [diastolic, setDiastolic] = useState();
    const [weight, setWeight] = useState();
    
    useEffect(() => {
        setDpContext({...dpContext, weight, systolic, diastolic});
    }, [weight, systolic, diastolic]);

    const AddWeightInputGroup = () => {
        return (
            <div className="input-group has-validation">
                <span className="input-group-text" id="weight-input">Weight</span>
                <input
                    type="number"
                    className="form-control is-invalid"
                    placeholder=""
                    aria-label="Weight"
                    aria-describedby="weight-input validationWeightFeedback"
                    onChange={(e) => {setWeight(e.target.value)}} />
                <button
                    className="btn btn-outline-primary px-5"
                    type="button"
                    id="weight-add-button"
                    onClick={addDatapoint} >
                        Add
                </button>
                <div id="validationWeightFeedback" className="invalid-feedback">
                    Weight has to be a number, greater than 1.
                </div>
            </div>
        );
    };

    const AddBloodPressureInputGroup = () => {
        console.log(systolic)
        useEffect(() => {
            // setDpContext({...dpContext, systolic, diastolic});
        }, []);
        return (
            <div className="input-group">
                <span className="input-group-text" id="weight-input">Systolic</span>
                <input
                    type="number"
                    className="form-control"
                    placeholder=""
                    aria-label="Weight"
                    aria-describedby="weight-input"
                    onChange={(e) => {setSystolic(e.target.value)}} />
                <span className="input-group-text" id="weight-input">Diastolic</span>
                <input
                    type="number"
                    className="form-control"
                    placeholder=""
                    aria-label="Weight"
                    aria-describedby="weight-input"
                    onChange={(e) => {setDiastolic(e.target.value)}} />
                <button
                    className="btn btn-outline-primary px-5"
                    type="button"
                    id="weight-add-button"
                    onClick={() => dpContext.addDatapoint()} >
                    Add
                </button>
            </div>
        );
    };

    if (type === DATA_TYPE.WEIGHT) {
        return <AddWeightInputGroup />;
    } else if (type === DATA_TYPE.BLOOD_PRESSURE) {
        return <AddBloodPressureInputGroup />;
    }
    return null;
    
};
