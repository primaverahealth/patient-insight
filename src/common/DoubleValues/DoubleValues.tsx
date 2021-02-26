import React, { ReactElement } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import { width_50 } from '../../utils/WidthUtils';
import { DoubleValuesProps, IDoubleValues } from '../../interfaces';


const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    valueContainer: {
        width: width_50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        padding: '12px'
    },
    value: {
        fontWeight: 300,
        fontSize: '34px'
    },
    valueDescription: {
        fontSize: '14px'
    }
}))

export default function DoubleValues(props: DoubleValuesProps): ReactElement {
    const classes = useStyles();
    const { data } = props;

    return (
        <div className={classes.container}>
            {data.map((item: IDoubleValues) => (
                <div className={classes.valueContainer} key={item.description}>
                    <div className={classes.value}>{item.value}</div>
                    <Typography variant={'caption'}>{item.description}</Typography>
                </div>
            ))}
        </div>
    )
}
