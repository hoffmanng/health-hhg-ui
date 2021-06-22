import { createContext } from 'react';

export const DatapointContext = createContext({
    weight: '',
    systolic: '',
    diastolic: '',
    data: [],
    dataType: ''
});