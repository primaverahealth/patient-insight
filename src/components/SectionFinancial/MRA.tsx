import React, { ReactElement } from 'react';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { commonStyles } from '../../utils/CommonStyles';
import DoubleValues from '../../common/DoubleValues/DoubleValues';
import { DoubleValuesProps } from '../../interfaces';


export default function MRA(): ReactElement {
    const common = commonStyles();
    const info: DoubleValuesProps = {
        data: [
            { value: 1.61, description: '(2019)' },
            { value: 1.50, description: '(2020)' }
        ]
    }

    return (
        <Paper elevation={1} className={common.box}>
            <DoubleValues data={info.data}/>
            <div className={common.footer}>
                <Typography variant='subtitle1' gutterBottom align="center">
                    MRA
                </Typography>
            </div>
        </Paper>
    );
}
