import React, { ReactElement } from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import Divider from '../../common/Divider/Divider';

const useStyles = makeStyles(() => ({
    box: {
        padding: '12px',
        boxShadow: '0 3px 5px 0 rgb(0 0 0 / 10%)',
        height: 140,
        margin: '12px 4px'
    },
}))

export default function SpecialtyBreakdown(): ReactElement {
    const classes = useStyles();

    return (
        <Paper className={classes.box}>
            <Typography variant='h5' component='h1' gutterBottom align="left">
                Specialty Breakdown
            </Typography>
            <Divider/>
        </Paper>
    );
}
