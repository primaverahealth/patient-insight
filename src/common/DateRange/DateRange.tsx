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

export default function DateRange(): ReactElement {
    const classes = useStyles();
    const [date, setDate] = React.useState<ValueType>([
        dateFns.startOfDay(dateFns.subMonths(new Date(), 6)),
        dateFns.endOfDay(new Date())
    ]);

    const onChange = (dates: any) => {
        setDate(dates);
    }

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
