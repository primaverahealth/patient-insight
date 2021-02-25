import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Paper } from '@material-ui/core';

import Divider from '../../common/Divider/Divider';

const useStyles = makeStyles(() => ({
    box: {
        padding: '12px',
        boxShadow: '0 3px 5px 0 rgb(0 0 0 / 10%)',
        margin: '4px'
    }
}))

export default function MemberTrendTracker(): ReactElement {
    const classes = useStyles();

    return (
        <Paper elevation={1} className={classes.box}>
            <Typography variant='h5' component='h1' gutterBottom align="left">
                Member Tracker / Trend Graphic
            </Typography>
            <Divider/>
        </Paper>
    );
}
