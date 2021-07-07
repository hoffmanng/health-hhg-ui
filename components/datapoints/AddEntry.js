import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { getTypeFromQuery, DATA_TYPE } from '../../lib/DatapointHelper';
import { DatapointContext } from '../contexts/DatapointContext';

export default function AddEntry() {
    const router = useRouter();
    const type = getTypeFromQuery(router.query);
    
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
                    onChange={null} />
                <button
                    className="btn btn-outline-primary px-5"
                    type="button"
                    id="weight-add-button"
                    onClick={null} >
                        Add
                </button>
                <div id="validationWeightFeedback" className="invalid-feedback">
                    Weight has to be a number, greater than 1.
                </div>
            </div>
        );
    };

    const AddBloodPressureInputGroup = () => {
        return (
            <div className="input-group">
                <span className="input-group-text" id="weight-input">Systolic</span>
                <input
                    type="number"
                    className="form-control"
                    placeholder=""
                    aria-label="Weight"
                    aria-describedby="weight-input"
                    onChange={null} />
                <span className="input-group-text" id="weight-input">Diastolic</span>
                <input
                    type="number"
                    className="form-control"
                    placeholder=""
                    aria-label="Weight"
                    aria-describedby="weight-input"
                    onChange={null} />
                <button
                    className="btn btn-outline-primary px-5"
                    type="button"
                    id="weight-add-button"
                    onClick={null} >
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
