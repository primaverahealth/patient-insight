import React, { ReactElement, useEffect } from 'react';
import {
    LinearProgress,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { isNil } from 'lodash';

import Divider from '../../common/Divider/Divider';
import { MedicationsProps } from '../../interfaces';
import { useAppState } from '../../state';
import NumberFormat from 'react-number-format';
import { width_100 } from '../../utils';

const useStyles = makeStyles(() => ({
    box: {
        padding: '12px',
        boxShadow: '0 3px 5px 0 rgb(0 0 0 / 10%)',
        height: 665,
        margin: '12px 4px'
    },
    table: {
        width: width_100,
    },
    action: {
        cursor: 'pointer',
        transition: '.3s ease-in-out',
        color: '#1b55c6',
        '&:hover': {
            textDecoration: 'underline',
        },
    }
}))

export default function Medications(props: { rxs: MedicationsProps[] }): ReactElement {
    const classes = useStyles();
    const { isFetching } = useAppState();
    // hook for default state of the query params to use
    const [dataSource, setDataSource] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    /**
     * @description Mapping data to represent information.
     * @param {MedicationsProps[]} data
     * @author Frank Corona Prendes <frank.corona@primavera.care>
     */
    const mappedInformation = (data: MedicationsProps[]) => {
        return data.map(({ claimType, drugName, prescribingName, qty, paidDate, paidAmount, claimId, rxNumber }) => {
            claimType = Object.is(claimType, 'G') ? 'Generic' : 'Brand';
            paidAmount = isNil(paidAmount) ? 0 : paidAmount;

            return { claimType, drugName, prescribingName, qty, paidDate, paidAmount, claimId, rxNumber };
        });
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // using the hook for wait for the update of the props and update the datasource
    useEffect(() => {
        // @ts-ignore
        setDataSource(mappedInformation(props.rxs));
    }, [props.rxs])

    return (
        <Paper className={classes.box}>
            <Typography variant='h5' component='h1' gutterBottom align="left">
                Medications
            </Typography>
            {isFetching
                ? <LinearProgress/>
                : <>
                    <TableContainer>
                        <Table className={classes.table} size="medium" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Drug Name</TableCell>
                                    <TableCell align="right">Paid Amount</TableCell>
                                    <TableCell align="right">Units</TableCell>
                                    <TableCell align="left">Prescriber</TableCell>
                                    <TableCell align="left">Date Dispensed</TableCell>
                                    <TableCell align="left">Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataSource.map((row: MedicationsProps, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell align="left">
                                            <Typography variant={'body2'}
                                                        className={classes.action}>{row.drugName}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <NumberFormat value={row.paidAmount}
                                                          displayType={'text'}
                                                          thousandSeparator={true}
                                                          decimalScale={2}
                                                          prefix={'$'}/>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant={'body2'}>{row.qty}</Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography variant={'body2'}>{row.prescribingName}</Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography variant={'body2'}>{row.paidDate}</Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography variant={'body2'}>{row.claimType}</Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={dataSource.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </>
            }
            <Divider/>
        </Paper>
    );
}
