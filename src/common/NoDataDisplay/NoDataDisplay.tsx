import React, { ReactElement } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import { height_50 } from '../../utils/HeightUtils';

const useStyles = makeStyles(() => ({
    container: {
        padding: '4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: height_50,
        color: 'grey',
    }
}))

export default function NoDataDisplay(): ReactElement {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Typography variant={'caption'}>No Data to Display</Typography>
        </div>
    );
}
