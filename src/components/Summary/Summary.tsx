import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
// https://www.npmjs.com/package/react-number-format
import NumberFormat from 'react-number-format';

import Divider from '../../common/Divider/Divider';
import { width_100 } from '../../utils/WidthUtils';

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

export default function Summary(): ReactElement {
    const classes = useStyles();
    const createData = (netPremium: number, inpatient: number, outpatient: number, specialists: number, pharmacy: number, otc: number, netRevenue: number) => {
        return { netPremium, inpatient, outpatient, specialists, pharmacy, otc, netRevenue };
    }
    const rows = [
        createData(7185.001, 15381, 545, 3448, 234, 0, 13911),
    ];


    return (
        <Paper elevation={1} className={classes.box}>
            <Typography variant='h5' component='h1' gutterBottom align="left">
                Summary
            </Typography>
            <Divider/>
            <TableContainer>
                <Table className={classes.table} size="medium" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Net Premium</TableCell>
                            <TableCell align="right">Inpatient</TableCell>
                            <TableCell align="right">Outpatient</TableCell>
                            <TableCell align="right">Specialist</TableCell>
                            <TableCell align="right">Pharmacy</TableCell>
                            <TableCell align="right">OTC</TableCell>
                            <TableCell align="right">Net Revenue</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.netRevenue}>
                                <TableCell align="right">
                                    <NumberFormat value={row.netPremium}
                                                  displayType={'text'}
                                                  thousandSeparator={true}
                                                  decimalScale={2}
                                                  prefix={'$'}/>
                                </TableCell>
                                <TableCell align="right">
                                    <NumberFormat value={row.inpatient}
                                                  displayType={'text'}
                                                  thousandSeparator={true}
                                                  decimalScale={2}
                                                  prefix={'$'}/>
                                </TableCell>
                                <TableCell align="right">
                                    <NumberFormat value={row.outpatient}
                                                  displayType={'text'}
                                                  thousandSeparator={true}
                                                  decimalScale={2}
                                                  prefix={'$'}/>
                                </TableCell>
                                <TableCell align="right">
                                    <NumberFormat value={row.specialists}
                                                  displayType={'text'}
                                                  thousandSeparator={true}
                                                  decimalScale={2}
                                                  prefix={'$'}/>
                                </TableCell>
                                <TableCell align="right">
                                    <NumberFormat value={row.pharmacy}
                                                  displayType={'text'}
                                                  thousandSeparator={true}
                                                  decimalScale={2}
                                                  prefix={'$'}/>
                                </TableCell>
                                <TableCell align="right">
                                    <NumberFormat value={row.otc}
                                                  displayType={'text'}
                                                  thousandSeparator={true}
                                                  decimalScale={2}
                                                  prefix={'$'}/>
                                </TableCell>
                                <TableCell align="right">
                                    <NumberFormat value={row.netRevenue}
                                                  displayType={'text'}
                                                  thousandSeparator={true}
                                                  decimalScale={2}
                                                  prefix={'$'}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
