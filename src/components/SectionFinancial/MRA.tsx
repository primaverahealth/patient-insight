import React, { ReactElement, useState } from 'react';
import { Paper } from '@material-ui/core';
import moment from 'moment';

import { commonStyles } from '../../utils';
import DoubleValues from '../../common/DoubleValues/DoubleValues';
import FinancialFooter from '../../common/FinancialFooter/FinancialFooter';
import { DoubleValuesProps, FinancialFooterProps, FinancialWidgetsProps } from '../../interfaces';


export default function MRA(props: { data: FinancialWidgetsProps }): ReactElement {
    const common = commonStyles();
    const { data } = props;
    const [prevYear] = useState(moment().subtract(1, 'year').format('YYYY'));
    const [currentYear] = useState(moment().format('YYYY'));
    const doubleValueProps: DoubleValuesProps = {
        data: [
            { value: data.lastYearMRA, description: `${prevYear}` },
            { value: data.lastMRA, description: `${currentYear}` }
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
