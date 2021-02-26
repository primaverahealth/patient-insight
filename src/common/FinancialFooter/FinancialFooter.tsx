import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';

import { commonStyles } from '../../utils/CommonStyles';
import { FinancialFooterProps } from '../../interfaces';


export default function FinancialFooter(props: FinancialFooterProps): ReactElement {
    const common = commonStyles();
    const { data } = props;

    return (
        <div className={common.footer}>
            <Typography variant='subtitle1' gutterBottom align="center">
                {data.name}
            </Typography>
        </div>
    );
}
