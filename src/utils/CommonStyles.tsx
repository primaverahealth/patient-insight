import { makeStyles } from '@material-ui/core';
import { width_50 } from './WidthUtils';


export const commonStyles = makeStyles(() => ({
    box: {
        boxShadow: '0 3px 5px 0 rgb(0 0 0 / 10%)',
        height: 140,
        margin: '12px 4px',
        width: width_50,
    },
    footer: {
        background: 'whitesmoke',
        minHeight: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))
