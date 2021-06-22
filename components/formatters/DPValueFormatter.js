export default function DPValueFormatter({ type, value }) {
    let formattedValue = '';
    switch(type) {
        case 'weight':
            formattedValue = `${value}`;
            break;
        case 'blood_pressure':
            formattedValue = `${value.systolic} / ${value.diastolic}`;
            break;
        default:
            formattedValue = 'Invalid value / unit of measure';
    } 
    return formattedValue;
};
