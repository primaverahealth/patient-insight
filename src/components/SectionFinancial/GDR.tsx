import React, { ReactElement } from 'react';
import { Paper } from '@material-ui/core';

import { commonStyles } from '../../utils';
import { FinancialFooterProps, FinancialWidgetsProps, SingleValueProps } from '../../interfaces';
import SingleValue from '../../common/SingleValue/SingleValue';
import FinancialFooter from '../../common/FinancialFooter/FinancialFooter';


export default function GDR(props: { data: FinancialWidgetsProps }): ReactElement {
    const common = commonStyles();
    const { data } = props;
    const [gdr, setGDR] = React.useState(0);
    const singleValueProps: SingleValueProps = { data: { key: 'gdr', value: gdr } }
    const footerProps: FinancialFooterProps = { data: { name: 'GDR' } };

    React.useEffect(() => {
        setGDR(data.gdr || 0);
    }, [props.data])

    return (
        <Paper elevation={1} className={common.box}>
            <SingleValue data={singleValueProps.data}/>
            <FinancialFooter data={footerProps.data}/>
        </Paper>
    );
}
