import React, { ReactElement, useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';

import { commonStyles } from '../../utils';
import SingleValue from '../../common/SingleValue/SingleValue';
import { FinancialFooterProps, FinancialWidgetsProps, SingleValueProps } from '../../interfaces';
import FinancialFooter from '../../common/FinancialFooter/FinancialFooter';


export default function EFR(props: { data: FinancialWidgetsProps }): ReactElement {
    const common = commonStyles();
    const { data } = props;
    const [efr, setEFR] = useState(0);
    const singleValueProps: SingleValueProps = { data: { value: efr } }
    const footerProps: FinancialFooterProps = { data: { name: 'EFR' } };

    useEffect(() => {
        setEFR(data.efr || 0);
    }, [props.data])

    return (
        <Paper elevation={1} className={common.box}>
            <SingleValue data={singleValueProps.data}/>
            <FinancialFooter data={footerProps.data}/>
        </Paper>
    );
}
