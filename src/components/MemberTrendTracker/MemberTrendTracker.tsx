import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import Divider from '../../common/Divider/Divider';
import { width_100 } from '../../utils/WidthUtils';
import TrendStatus from '../TrendStatus/TrendStatus';

const useStyles = makeStyles(() => ({
    box: {
        padding: '12px',
        boxShadow: '0 3px 5px 0 rgb(0 0 0 / 10%)',
        margin: '4px'
    },
    table: {
        width: width_100,
    },
}))

export default function MemberTrendTracker(): ReactElement {
    const classes = useStyles();
    const createData = (mar2020: string, apr2020: string, may2020: string, jun2020: string, jul2020: string, aug2020: string, sep2020: string) => {
        return { mar2020, apr2020, may2020, jun2020, jul2020, aug2020, sep2020 };
    }
    const rows = [
        createData('active', 'active', 'inactive', 'active', 'inactive', 'active', 'active'),
    ];

    return (
        <Paper elevation={1} className={classes.box}>
            <Typography variant='h5' component='h1' gutterBottom align="left">
                Member Tracker / Trend Graphic
            </Typography>
            <Divider/>
            <TableContainer>
                <Table className={classes.table} size="medium" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">{''}</TableCell>
                            <TableCell align="left">Mar, 2020</TableCell>
                            <TableCell align="left">Apr, 2020</TableCell>
                            <TableCell align="left">Jun, 2020</TableCell>
                            <TableCell align="left">Jul, 2020</TableCell>
                            <TableCell align="left">Aug, 2020</TableCell>
                            <TableCell align="left">Sep, 2020</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.mar2020}>
                                <TableCell align="center">
                                    {'Status'}
                                </TableCell>
                                <TableCell align="center">
                                    <TrendStatus value={row.mar2020}/>
                                </TableCell>
                                <TableCell align="center">
                                    <TrendStatus value={row.apr2020}/>
                                </TableCell>
                                <TableCell align="center">
                                    <TrendStatus value={row.may2020}/>
                                </TableCell>
                                <TableCell align="center">
                                    <TrendStatus value={row.jun2020}/>
                                </TableCell>
                                <TableCell align="center">
                                    <TrendStatus value={row.jul2020}/>
                                </TableCell>
                                <TableCell align="center">
                                    <TrendStatus value={row.aug2020}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
