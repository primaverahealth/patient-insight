import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core';
import { isNil } from 'lodash';
import NumberFormat from 'react-number-format';

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
    const isNegative = (value: number | undefined) => {
        let style;
        // GDR > 90 normal < 90 negative
        // MLR < 85 normal >= 85 negative
        switch (data.key) {
            case 'gdr':
                style = (!isNil(value)) && (value < 90) ? styles.negativeValue : styles.value;
                break;

            case 'mlr':
                style = (!isNil(value)) && (value >= 85) ? styles.negativeValue : styles.value;
                break;

            default:
                style = styles.value;
        }
        return style;
    }

    return (
        <div className={styles.container}>
            <div className={isNegative(data.value)}>
                <NumberFormat
                    decimalScale={2}
                    suffix={'%'}
                    value={data.value}
                    displayType={'text'}
                />
            </div>
        </div>
    )
}
