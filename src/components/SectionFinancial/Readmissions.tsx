import React, { ReactElement } from 'react';
import { Paper } from '@material-ui/core';

import { commonStyles } from '../../utils/CommonStyles';
import { DoubleValuesProps, FinancialFooterProps, FinancialWidgetsProps } from '../../interfaces';
import DoubleValues from '../../common/DoubleValues/DoubleValues';
import FinancialFooter from '../../common/FinancialFooter/FinancialFooter';


export default function Readmissions(props: { data: FinancialWidgetsProps }): ReactElement {
    const common = commonStyles();
    const { data } = props;
    const doubleValuesProps: DoubleValuesProps = {
        data: [
            { value: data.readmissions, description: 'Claims' },
            { value: data.totalReadmissions, description: 'ENS' }
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
