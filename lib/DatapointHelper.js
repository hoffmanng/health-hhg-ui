export const DATA_TYPE = {
    WEIGHT: 'weight',
    BLOOD_PRESSURE: 'blood_pressure',
    UNKNOWN: 'unknown',
    ALL: 'all',
    ERROR: 'error'
};

export const PATH_NAMES = {
    EMPTY: '',
    HOME: 'Home',
    DATAPOINTS: 'Datapoints'
};

export function getTypeFromQuery(query) {
    if (!query) {
        return DATA_TYPE.ERROR;
    }
    if (!query.hasOwnProperty('dataType')) {
        return DATA_TYPE.ALL;
    }
    if (query.dataType === DATA_TYPE.WEIGHT) {
        return DATA_TYPE.WEIGHT;
    }
    if (query.dataType === DATA_TYPE.BLOOD_PRESSURE) {
        return DATA_TYPE.BLOOD_PRESSURE;
    }
    return DATA_TYPE.UNKNOWN;
};

export function getTypeDataFromQuery(query) {
    const type = getTypeFromQuery(query);
    const typeData = {
        text: '',
        unitOfMeasure: '',
        dataType: ''
    };
    
    switch(type) {
        case DATA_TYPE.ALL:
            typeData.text = 'All datapoints';
            typeData.dataType = DATA_TYPE.ALL;
            break;
        case DATA_TYPE.WEIGHT:
            typeData.text = 'Weight';
            typeData.unitOfMeasure = 'kg';
            typeData.dataType = DATA_TYPE.WEIGHT;
            break;
        case DATA_TYPE.BLOOD_PRESSURE:
            typeData.text = 'Blood Pressure';
            typeData.unitOfMeasure = 'mmHg';
            typeData.dataType = DATA_TYPE.BLOOD_PRESSURE;
            break;
        default:
            typeData.text = 'Unknown';
    }
    return typeData;
};

// Constructs string from value or object
// Used to display value on UI
export function constructValue(type, value) {
    let formattedValue = '';

    switch(type) {
        case DATA_TYPE.WEIGHT:
            formattedValue = `${value}`;
            break;
        case DATA_TYPE.BLOOD_PRESSURE:
            formattedValue = `${value.systolic} / ${value.diastolic}`;
            break;
        default:
            formattedValue = 'Invalid value / unit of measure';
    } 
    return formattedValue;
};

export function getPathDescription(router) {
    if (router.pathname !== '/datapoints') {
        return;
    }
    const data = getTypeDataFromQuery(router.query);
    return data.text;
};
