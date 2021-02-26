import React, { ReactElement } from 'react';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { commonStyles } from '../../utils/CommonStyles';
import SingleValue from '../../common/SingleValue/SingleValue';
import { SingleValueProps } from '../../interfaces';


export default function EFR(): ReactElement {
    const common = commonStyles();
    const info: SingleValueProps = {
        data: { value: 327.9 }
    }

    return (
        <Paper elevation={1} className={common.box}>
            <SingleValue data={info.data}/>
            <div className={common.footer}>
                <Typography variant='subtitle1' gutterBottom align="left">
                    EFR
                </Typography>
            </div>
        </Paper>
    );
}
