import React, { ReactElement } from 'react';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { commonStyles } from '../../utils/CommonStyles';
import { SingleValueProps } from '../../interfaces';
import SingleValue from '../../common/SingleValue/SingleValue';


export default function GDR(): ReactElement {
    const common = commonStyles();
    const info: SingleValueProps = { data: { value: 96.77 } }

    return (
        <Paper elevation={1} className={common.box}>
            <SingleValue data={info.data}/>
            <div className={common.footer}>
                <Typography variant='subtitle1' gutterBottom align="left">
                    GDR
                </Typography>
            </div>
        </Paper>
    );
}
