import { createContext } from 'react';

export const defaultDatapointContext = {
    weight: '',
    systolic: '',
    diastolic: '',
    datapoints: [],
    deleteDatapoint: () => {},
    addDatapoint: () => {},
    isWeightValid: null,
    isSystolicValid: null,
    isDiastolicValid: null,
    validateWeight: () => {},
    weightError: '',
    validateSystolic: () => {},
    validateDiastolic: () => {}
};

export const DatapointContext = createContext(defaultDatapointContext);