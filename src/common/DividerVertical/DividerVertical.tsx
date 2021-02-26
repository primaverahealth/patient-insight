import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    divider: {
        height: '60px'
    }
}))

export default function DividerVertical(): ReactElement {
    const classes = useStyles();

    return (<hr className={classes.divider}/>);
}
