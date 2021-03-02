import React, { ReactElement } from 'react';
import { Paper } from '@material-ui/core';

import { commonStyles } from '../../utils/CommonStyles';
import DoubleValues from '../../common/DoubleValues/DoubleValues';
import { DoubleValuesProps, FinancialFooterProps, FinancialWidgetsProps } from '../../interfaces';
import FinancialFooter from '../../common/FinancialFooter/FinancialFooter';


export default function ERVisits(props: { data: FinancialWidgetsProps }): ReactElement {
    const common = commonStyles();
    const { data } = props;
    const doubleValueProps: DoubleValuesProps = {
        data: [
            { value: data.erVisits, description: 'Claims' },
            { value: data.totalErVisits, description: 'ENS' }
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
