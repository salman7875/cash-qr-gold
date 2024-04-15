export function getYearsList(date: any) {
    const year = date.getFullYear();
    const prevYear = year - 1;
    const monthIndex = date.getMonth();
    const yearsList = [];

    for (let y = prevYear; y <= year; y++) {
        const startMonth = (y === prevYear) ? monthIndex + 1 : 0;
        const endMonth = (y === year) ? monthIndex : 11;
        const yearObject: any = {
            year: y,
            months: []
        };

        for (let m = startMonth; m <= endMonth; m++) {
            yearObject.months.push({
                month: m,
                name: new Date(y, m).toLocaleString('default', { month: 'long' })
            });
        }
        yearsList.push(yearObject);
    }

    return yearsList;
}