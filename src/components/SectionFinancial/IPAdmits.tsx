import React, { ReactElement } from 'react';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { commonStyles } from '../../utils/CommonStyles';


export default function IPAdmits(): ReactElement {
    const common = commonStyles();

    return (
        <Paper elevation={1} className={common.box}>
            <div className={common.footer}>
                <Typography variant='subtitle1' gutterBottom align="center">
                    IP Admits
                </Typography>
            </div>
        </Paper>
    );
}
