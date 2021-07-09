import { useEffect, useState } from "react";
import NProgress from "nprogress";
import { dbHelper } from '../../lib/DbHelper';
import { getTypeDataFromQuery } from '../../lib/DatapointHelper';
import { useRouter } from "next/router";
import { useStateStore } from "../stores/StateContext";

export default function AddBloodPressureInputGroup() {
    const router = useRouter();
    const stateStore = useStateStore();
    const [isValid, setIsValid] = useState(true);
    const [isFilled, setIsFilled] = useState(false);
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');

    useEffect(() => {
        setIsFilled(!!systolic && !!diastolic);
        setIsValid(true);
    }, [systolic, diastolic]);

    const addDatapoint = async () => {
        NProgress.start();

        const { dataType, unitOfMeasure } = getTypeDataFromQuery(router.query);
        const datapoint = { dataType, unitOfMeasure, value: { systolic, diastolic } };
        try {
            stateStore.addDatapoint(datapoint);
            await dbHelper.insertDatapoint(datapoint);
            await stateStore.refreshDatapoints('blood_pressure');
        } catch(e) {
            setIsValid(false);
            console.log(e);
        }

        NProgress.done();
    };

    return (
        <div className="input-group has-validation">
            <span className="input-group-text" id="systolic-input">Systolic</span>
            <input
                value={systolic}
                type="number"
                className={`form-control ${ isValid ? '' : 'is-invalid' }`}
                placeholder=""
                aria-label="Systolic"
                aria-describedby="systolic-input"
                onChange={e => setSystolic(e.target.value)} />
            <span className="input-group-text" id="diastolic-input">Diastolic</span>
            <input
                value={diastolic}
                type="number"
                className={`form-control ${ isValid ? '' : 'is-invalid' }`}
                placeholder=""
                aria-label="Diastolic"
                aria-describedby="diastolic-input"
                onChange={e => setDiastolic(e.target.value)} />
            <button
                className={`btn btn-outline-primary px-5 ${ isFilled ? '' : 'disabled' }`}
                type="button"
                id="blood-pressure-add-button"
                onClick={addDatapoint} >
                Add
            </button>
        </div>
    );
};
