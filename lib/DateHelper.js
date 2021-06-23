export function dateFormatter(dateString) {
    const dateObj = new Date(dateString);
    const addZero = number => number < 10 ? `0${number}` : number;

    const date = {
        year: dateObj.getFullYear(),
        month: addZero(dateObj.getMonth() + 1),
        day: addZero(dateObj.getDate()),
        hour: addZero(dateObj.getHours()),
        minutes: addZero(dateObj.getMinutes())
    };
    return {
        date: `${date.year}-${date.month}-${date.day}`,
        time: `${date.hour}:${date.minutes}`
    }
};
