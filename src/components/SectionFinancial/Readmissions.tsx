import React, { ReactElement } from 'react';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { commonStyles } from '../../utils/CommonStyles';
import { DoubleValuesProps } from '../../interfaces';
import DoubleValues from '../../common/DoubleValues/DoubleValues';


export default function Readmissions(): ReactElement {
    const common = commonStyles();
    const info: DoubleValuesProps = {
        data: [
            { value: 0, description: 'Claims' },
            { value: 0, description: 'ENS' }
        ]
    }

    return (
        <Paper elevation={1} className={common.box}>
            <DoubleValues data={info.data}/>
            <div className={common.footer}>
                <Typography variant='subtitle1' gutterBottom align="left">
                    Readmissions
                </Typography>
            </div>
        </Paper>
    );
}
