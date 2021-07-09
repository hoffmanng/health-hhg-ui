import { useEffect, useState } from "react";
import NProgress from "nprogress";
import { dbHelper } from '../../lib/DbHelper';
import { getTypeDataFromQuery } from '../../lib/DatapointHelper';
import { useRouter } from "next/router";
import { useStateStore } from "../stores/StateContext";

export default function AddWeightInputGroup() {
    const router = useRouter();
    const stateStore = useStateStore();
    const [isValid, setIsValid] = useState(true);
    const [isFilled, setIsFilled] = useState(false);
    const [weight, setWeight] = useState('');

    useEffect(() => {
        setIsFilled(!!weight);
        setIsValid(true);
    }, [weight]);

    const addDatapoint = async () => {
        NProgress.start();

        const { dataType, unitOfMeasure } = getTypeDataFromQuery(router.query);
        const datapoint = { dataType, unitOfMeasure, value: weight };
        try {
            stateStore.addDatapoint(datapoint);
            await dbHelper.insertDatapoint(datapoint);
            await stateStore.refreshDatapoints('weight');
        } catch(e) {
            setIsValid(false);
            console.log(e);
        }

        NProgress.done();
    };

    return (
        <div className="input-group has-validation">
            <span className="input-group-text" id="weight-input">Weight</span>
            <input
                value={weight}
                type="number"
                className={`form-control ${ isValid ? '' : 'is-invalid' }`}
                placeholder=""
                aria-label="Weight"
                aria-describedby="weight-input validationWeightFeedback"
                onChange={e => setWeight(e.target.value)} />
            <button
                className={`btn btn-outline-primary px-5 ${ isFilled ? '' : 'disabled' }`}
                type="button"
                id="weight-add-button"
                onClick={addDatapoint} >
                    Add
            </button>
            <div id="validationWeightFeedback" className="invalid-feedback">
                Invalid value. Weight has to be a number, greater than 0.
            </div>
        </div>
    );
};
