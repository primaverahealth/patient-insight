import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core';
import * as dateFns from 'date-fns';
import { DateRangePicker } from 'rsuite';
import { ValueType } from 'rsuite/lib/DateRangePicker';
import 'rsuite/dist/styles/rsuite-default.css';

import { width_100 } from '../../utils/WidthUtils';
import { Ranges } from './CustomRanges';

const useStyles = makeStyles(() => ({
    container: {
        margin: '12px 0',
        width: width_100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    picker: {
        marginRight: '12px'
    },
}))

export default function DateRange(props: { onChangeDate: Function }): ReactElement {
    const classes = useStyles();
    const [date] = React.useState<ValueType>([
        dateFns.startOfMonth(dateFns.subMonths(new Date(), 5)),
        dateFns.endOfDay(new Date())
    ]);

    const onChange = (dates: any) => props.onChangeDate(dates);

    return (
        <div className={classes.container}>
            <DateRangePicker
                appearance="subtle"
                placeholder="Default"
                defaultValue={date}
                onChange={onChange}
                placement={'auto'}
                ranges={Ranges}
                cleanable={false}
                style={{ width: 230 }}
            />
        </div>
    );
}
