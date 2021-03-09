import React, { ReactElement } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { toTitleCase, width_100 } from '../../utils';

const useStyles = makeStyles((theme: Theme) => ({
    badgeContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'whitesmoke',
        borderRadius: '8px',
        textAlign: 'center',
        padding: '0 8px',
        height: '24px',
        [theme.breakpoints.down('sm')]: {
            width: width_100
        }
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
    const isActive = (param: string) => Object.is(param, 'active') ? classes.badgeActive : classes.badgeInActive;


    return (
        <>
            {Object.is(props.value, 'Status')
                ? <Typography variant={'body2'} className={classes.typo}>{toTitleCase(props.value)}</Typography>
                : <div className={classes.badgeContainer}>
                    <small className={isActive(props.value)}>
                        &#8226;
                    </small>
                    <span className={classes.span}>
                        <Typography variant={'caption'}
                            className={classes.typo}>{props.value.toUpperCase()}
                        </Typography>
                    </span>
                </div>
            }
        </>
    );
}
