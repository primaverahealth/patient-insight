import { makeStyles, Theme } from '@material-ui/core';
import { width_100 } from './WidthUtils';


export const commonStyles = makeStyles((theme: Theme) => ({
    box: {
        boxShadow: '0 3px 5px 0 rgb(0 0 0 / 10%)',
        height: 140,
        margin: '12px 4px',
        [theme.breakpoints.up('sm')]: {
            width: width_100
        },
    },
    footer: {
        background: 'whitesmoke',
        minHeight: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))
