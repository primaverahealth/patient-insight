import React, { ReactElement } from 'react';
import { Paper } from '@material-ui/core';

import { commonStyles } from '../../utils/CommonStyles';
import DoubleValues from '../../common/DoubleValues/DoubleValues';
import { DoubleValuesProps, FinancialFooterProps } from '../../interfaces';
import FinancialFooter from '../../common/FinancialFooter/FinancialFooter';


export default function ERVisits(): ReactElement {
    const common = commonStyles();
    const doubleValueProps: DoubleValuesProps = {
        data: [
            { value: 1, description: 'Claims' },
            { value: 0, description: 'ENS' }
        ]
    }
    const footerProps: FinancialFooterProps = { data: { name: 'ER Visits' } };

    return (
        <Paper elevation={1} className={common.box}>
            <DoubleValues data={doubleValueProps.data}/>
            <FinancialFooter data={footerProps.data}/>
        </Paper>
    );
}
