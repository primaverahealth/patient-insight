import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core';

import { width_100 } from '../../utils/WidthUtils';

const useStyles = makeStyles(() => ({
    divider: {
        margin: '12px 0',
        width: width_100,
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    }
}))

export default function Divider(): ReactElement {
    const classes = useStyles();

    return (<div className={classes.divider}/>);
}
