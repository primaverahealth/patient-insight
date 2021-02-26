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
    }
}))

export default function SingleValue(props: SingleValueProps): ReactElement {
    const styles = useStyles();
    const { data } = props;

    return (
        <div className={styles.container}>
            <div className={styles.value}>{data.value}%</div>
        </div>
    )
}
