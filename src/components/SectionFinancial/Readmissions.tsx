import React, { ReactElement } from 'react';
import { Paper } from '@material-ui/core';

import { commonStyles } from '../../utils/CommonStyles';
import { DoubleValuesProps, FinancialFooterProps } from '../../interfaces';
import DoubleValues from '../../common/DoubleValues/DoubleValues';
import FinancialFooter from '../../common/FinancialFooter/FinancialFooter';


export default function Readmissions(): ReactElement {
    const common = commonStyles();
    const doubleValuesProps: DoubleValuesProps = {
        data: [
            { value: 0, description: 'Claims' },
            { value: 0, description: 'ENS' }
        ]
    }
    const footerProps: FinancialFooterProps = { data: { name: 'Readmissions' } };

    return (
        <Paper elevation={1} className={common.box}>
            <DoubleValues data={doubleValuesProps.data}/>
            <FinancialFooter data={footerProps.data}/>
        </Paper>
    );
}
