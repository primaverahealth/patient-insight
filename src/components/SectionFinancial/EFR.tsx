import React, { ReactElement } from 'react';
import { Paper } from '@material-ui/core';

import { commonStyles } from '../../utils/CommonStyles';
import SingleValue from '../../common/SingleValue/SingleValue';
import { FinancialFooterProps, SingleValueProps } from '../../interfaces';
import FinancialFooter from '../../common/FinancialFooter/FinancialFooter';


export default function EFR(): ReactElement {
    const common = commonStyles();
    const singleValueProps: SingleValueProps = { data: { value: 327.9 } }
    const footerProps: FinancialFooterProps = { data: { name: 'EFR' } };

    return (
        <Paper elevation={1} className={common.box}>
            <SingleValue data={singleValueProps.data}/>
            <FinancialFooter data={footerProps.data}/>
        </Paper>
    );
}
