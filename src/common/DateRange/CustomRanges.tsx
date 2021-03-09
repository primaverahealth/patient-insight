import * as dateFns from 'date-fns';

export const Ranges: any = [
    {
        label: 'Year to Date',
        value: [
            dateFns.startOfDay(dateFns.startOfYear(new Date())),
            dateFns.endOfDay(new Date())
        ]
    },
    {
        label: 'Last 12 Months',
        value: [
            dateFns.startOfDay(dateFns.subMonths(new Date(), 12)),
            dateFns.endOfDay(new Date())
        ]
    },
    {
        label: 'Last 6 Months',
        value: [
            dateFns.startOfDay(dateFns.subMonths(new Date(), 6)),
            dateFns.endOfDay(new Date())
        ]
    }
];