import React, { ReactElement } from 'react';
import { Paper } from '@material-ui/core';

import { commonStyles } from '../../utils/CommonStyles';
import { FinancialFooterProps, SingleValueProps } from '../../interfaces';
import SingleValue from '../../common/SingleValue/SingleValue';
import FinancialFooter from '../../common/FinancialFooter/FinancialFooter';


export default function MLR(): ReactElement {
    const common = commonStyles();
    const singleValueProps: SingleValueProps = { data: { value: 278.7 } }
    const footerProps: FinancialFooterProps = { data: { name: 'MLR' } };

    return (
        <Paper elevation={1} className={common.box}>
            <SingleValue data={singleValueProps.data}/>
            <FinancialFooter data={footerProps.data}/>
        </Paper>
    );
}
