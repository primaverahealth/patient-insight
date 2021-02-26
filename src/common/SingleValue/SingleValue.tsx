import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core';

import { SingleValueProps } from '../../interfaces';


const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '22px'
    },
    value: {
        fontWeight: 300,
        fontSize: '34px'
    },
    negativeValue: {
        fontWeight: 300,
        fontSize: '34px',
        color: '#f4511e',
    }
}))

export default function SingleValue(props: SingleValueProps): ReactElement {
    const styles = useStyles();
    const { data } = props;
    const isNegative = (value: number) => {
        return (value > 100) ? styles.negativeValue : styles.value;
    }

    return (
        <div className={styles.container}>
            <div className={isNegative(data.value)}>{data.value}%</div>
        </div>
    )
}
