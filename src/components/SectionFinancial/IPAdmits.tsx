import React, { ReactElement } from 'react';
import { Paper } from '@material-ui/core';

import { commonStyles } from '../../utils/CommonStyles';
import DoubleValues from '../../common/DoubleValues/DoubleValues';
import { DoubleValuesProps, FinancialFooterProps, FinancialWidgetsProps } from '../../interfaces';
import FinancialFooter from '../../common/FinancialFooter/FinancialFooter';


export default function IPAdmits(props: { data: FinancialWidgetsProps }): ReactElement {
    const common = commonStyles();
    const { data } = props;
    const doubleValuesProps: DoubleValuesProps = {
        data: [
            { value: data.ipAdmits, description: 'Claims' },
            { value: data.totalIpAdmits, description: 'ENS' }
        ]
    }
    const footerProps: FinancialFooterProps = { data: { name: 'IP Admits' } };

    return (
        <Paper elevation={1} className={common.box}>
            <DoubleValues data={doubleValuesProps.data}/>
            <FinancialFooter data={footerProps.data}/>
        </Paper>
    );
}
