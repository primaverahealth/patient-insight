import moment from 'moment';

export const getMonthsBetweenDates = (dateStart: moment.Moment, dateEnd: moment.Moment, format = 'MMM, YYYY'): string[] => {
    const months: string[] = [];
    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
        months.push(dateStart.format(format));
        dateStart.add(1, 'month');
    }

    return months;
}

export const getDate = (acronym: string): { from: string, to: string } => {
    let from = '';
    let to = '';
    const YMD = 'YYYY-MM-DD';

    switch (acronym) {
        case 'l7d':
            to = moment().format(YMD);
            from = moment().subtract(7, 'd').format(YMD);
            break;
        case 'tWeek':
            from = moment().startOf('week').format(YMD);
            to = moment().endOf('week').format(YMD);
            break;
        case 'lWeek':
            from = moment().subtract(1, 'weeks').startOf('week').format(YMD);
            to = moment().subtract(1, 'weeks').endOf('week').format(YMD);
            break;
        case 'l2Week':
            from = moment().subtract(2, 'weeks').startOf('week').format(YMD);
            to = moment().subtract(2, 'weeks').endOf('week').format(YMD);
            break;
        case 'l6m':
            from = moment().subtract(5, 'months').startOf('month').format(YMD);
            to = moment().endOf('month').format(YMD);
            break;
        case 'l12m':
            from = moment().subtract(11, 'months').startOf('month').format(YMD);
            to = moment().endOf('month').format(YMD);
            break;
        case 'l24m':
            from = moment().subtract(23, 'months').startOf('month').format(YMD);
            to = moment().endOf('month').format(YMD);
            break;
        case 'l36m':
            from = moment().subtract(35, 'months').startOf('month').format(YMD);
            to = moment().endOf('month').format(YMD);
            break;
        case 'ytd':
            from = moment().startOf('year').format(YMD);
            to = moment().endOf('month').format(YMD);
            break;
        default:
            break;
    }

    return { from, to };
}
