import React, { ReactElement } from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { width_50 } from '../../utils/WidthUtils';
import Divider from '../../common/Divider/Divider';

const useStyles = makeStyles(() => ({
    box: {
        padding: '12px',
        boxShadow: '0 3px 5px 0 rgb(0 0 0 / 10%)',
        height: 140,
        margin: '12px 4px',
        width: width_50,
    },
}))

export default function InpatientOutpatient(): ReactElement {
    const classes = useStyles();

    return (
        <Paper className={classes.box}>
            <Typography variant='h5' component='h1' gutterBottom align="left">
                Inpatient/Outpatient
            </Typography>
            <Divider/>
        </Paper>
    );
}
