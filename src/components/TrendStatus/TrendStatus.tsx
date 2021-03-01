import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { toTitleCase } from '../../utils/ToTitleCase';
import { width_50 } from '../../utils/WidthUtils';

const useStyles = makeStyles(() => ({
    badgeContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'whitesmoke',
        borderRadius: '8px',
        textAlign: 'center',
        padding: '0 8px',
        height: '24px',
        width: width_50
    },
    badgeActive: {
        fontSize: '32px',
        color: 'rgb(187, 230, 73)'
    },
    badgeInActive: {
        fontSize: '32px',
        color: 'rgb(216, 67, 21)'
    },
    span: {
        marginLeft: '8px'
    },
    typo: {
        textStyle: 'capitalize'
    }
}))

export default function TrendStatus(props: { value: string }): ReactElement {
    const classes = useStyles();
    const isActive = (value: string) => Object.is(value, 'active') ? classes.badgeActive : classes.badgeInActive;

    return (
        <div className={classes.badgeContainer}>
            <small className={isActive(props.value)}>
                &#8226;
            </small>
            <span className={classes.span}>
                <Typography variant={'caption'} className={classes.typo}>{toTitleCase(props.value)}</Typography>
            </span>
        </div>
    );
}
