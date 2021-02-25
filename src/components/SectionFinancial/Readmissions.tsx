import React, { ReactElement } from 'react';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { commonStyles } from '../../utils/CommonStyles';


export default function Readmissions(): ReactElement {
    const common = commonStyles();

    return (
        <Paper elevation={1} className={common.box}>
            <div className={common.footer}>
                <Typography variant='subtitle1' gutterBottom align="left">
                    Readmissions
                </Typography>
            </div>
        </Paper>
    );
}
