import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Paper } from '@material-ui/core';

import Divider from '../../common/Divider/Divider';
import { height_100 } from '../../utils';

const useStyles = makeStyles(() => ({
    box: {
        padding: '12px',
        boxShadow: '0 3px 5px 0 rgb(0 0 0 / 10%)',
        height: height_100,
        margin: '12px 4px',
    },
    footer: {
        margin: '12px 4px',
    }
}))

export default function MRA(): ReactElement {
    const classes = useStyles();
    const [riskSroce, setRiskScore] = React.useState(0);

    return (
        <Paper elevation={1} className={classes.box}>
            <Typography variant='h5' component='h1' gutterBottom align="left">
                Risk Score: {riskSroce}
            </Typography>
            <Divider />
        </Paper>
    );
}
