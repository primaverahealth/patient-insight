import React, { ReactElement } from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import { width_50 } from '../../utils/WidthUtils';
import Divider from '../../common/Divider/Divider';
import NoDataDisplay from '../../common/NoDataDisplay/NoDataDisplay';

export interface HccProps {
    year: string,
    hccCodes: any[]
}

const useStyles = makeStyles(() => ({
    box: {
        padding: '12px',
        boxShadow: '0 3px 5px 0 rgb(0 0 0 / 10%)',
        height: 140,
        margin: '12px 4px',
        width: width_50,
    },
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
}))

export default function HCCs(props: { hccCodes: HccProps[] }): ReactElement {
    const classes = useStyles();
    const [prevYear] = React.useState(moment().subtract(1, 'year').format('YYYY'));
    const [currentYear] = React.useState(moment().format('YYYY'));

    return (
        <div className={classes.root}>
            <Paper className={classes.box}>
                <Typography variant='h5' component='h1' gutterBottom align="left">
                    Reported HCCs {prevYear}
                </Typography>
                <Divider />
                <NoDataDisplay />
            </Paper>
            <Paper className={classes.box}>
                <Typography variant='h5' component='h1' gutterBottom align="left">
                    Reported HCCs {currentYear}
                </Typography>
                <Divider />
                <NoDataDisplay />
            </Paper>
        </div>
    );
}
