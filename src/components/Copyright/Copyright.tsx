import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    footer: {
        margin: '12px 4px',
    }
}))

export default function Copyright(): ReactElement {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <MuiLink color="inherit" href="https://primavera.care/">
                    Primavera Care
                </MuiLink>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </div>
    );
}
