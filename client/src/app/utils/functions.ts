export function getDateObjectByDateTime(date: string, time: string) {
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);

    // Create a new Date object with the specified date and time values
    const dateObj = new Date();
    dateObj.setFullYear(year);
    dateObj.setMonth(month - 1); // Month index starts from 0 (January)
    dateObj.setDate(day);
    dateObj.setHours(hours);
    dateObj.setMinutes(minutes);

    return dateObj;
}