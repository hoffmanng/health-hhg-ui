export function getTypeFromQuery(query) {
    let type = 'all';
    if (!query || !query.hasOwnProperty('dataType')) {
        return type;
    }
    switch(query.dataType) {
        case 'weight':
            type = 'weight';
            break;
        case 'blood_pressure':
            type = 'blood_pressure';
            break;
        default:
            type = 'unknown';
    }
    return type;
};

export function getTypeDataFromQuery(query) {
    const type = getTypeFromQuery(query);
    const typeData = {
        text: '',
        unitOfMeasure: '',
        dataType: ''
    };
    
    switch(type) {
        case 'all':
            typeData.text = 'All datapoints';
            break;
        case 'weight':
            typeData.text = 'Weight';
            typeData.unitOfMeasure = 'kg';
            typeData.dataType = 'weight';
            break;
        case 'blood_pressure':
            typeData.text = 'Blood Pressure';
            typeData.unitOfMeasure = 'mmHg';
            typeData.dataType = 'blood_pressure';
            break;
        default:
            typeData.text = 'Unknown';
    }
    return typeData;
};

export function getFormattedValueFromQuery(query, value) {
    const type = getTypeFromQuery(query);
    let formattedValue;

    switch(type) {
        case 'weight':
            formattedValue = value;
            break;
        case 'blood_pressure':
            formattedValue = {
                systolic: value.systolic,
                diastolic: value.diastolic
            }
            break;
        default:
            formattedValue = value;
    }
    return formattedValue;
};