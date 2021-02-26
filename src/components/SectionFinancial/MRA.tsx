import React, { ReactElement } from 'react';
import { Paper } from '@material-ui/core';

import { commonStyles } from '../../utils/CommonStyles';
import DoubleValues from '../../common/DoubleValues/DoubleValues';
import { DoubleValuesProps, FinancialFooterProps } from '../../interfaces';
import FinancialFooter from '../../common/FinancialFooter/FinancialFooter';


export default function MRA(): ReactElement {
    const common = commonStyles();
    const doubleValueProps: DoubleValuesProps = {
        data: [
            { value: 1.61, description: '(2019)' },
            { value: 1.50, description: '(2020)' }
        ]
    }
    const footerProps: FinancialFooterProps = { data: { name: 'MRA' } };

    return (
        <Paper elevation={1} className={common.box}>
            <DoubleValues data={doubleValueProps.data}/>
            <FinancialFooter data={footerProps.data}/>
        </Paper>
    );
}
