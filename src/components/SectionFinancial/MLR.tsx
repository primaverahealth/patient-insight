import React, { ReactElement } from 'react';
import { Paper } from '@material-ui/core';

import { commonStyles } from '../../utils';
import { FinancialFooterProps, FinancialWidgetsProps, SingleValueProps } from '../../interfaces';
import SingleValue from '../../common/SingleValue/SingleValue';
import FinancialFooter from '../../common/FinancialFooter/FinancialFooter';


export default function MLR(props: { data: FinancialWidgetsProps }): ReactElement {
    const common = commonStyles();
    const { data } = props;
    const [mlr, setMLR] = React.useState(0);
    const singleValueProps: SingleValueProps = { data: { key: 'mlr', value: mlr } }
    const footerProps: FinancialFooterProps = { data: { name: 'MLR' } };

    React.useEffect(() => {
        setMLR(data.mlr || 0);
    }, [props.data])

    return (
        <Paper elevation={1} className={common.box}>
            <SingleValue data={singleValueProps.data}/>
            <FinancialFooter data={footerProps.data}/>
        </Paper>
    );
}
