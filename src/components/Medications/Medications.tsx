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
import { isEmpty, isNil } from 'lodash';
import NumberFormat from 'react-number-format';

import Divider from '../../common/Divider/Divider';
import { MedicationsProps, MetaProps } from '../../interfaces';
import { useAppState } from '../../state';
import { width_100 } from '../../utils';

const useStyles = makeStyles(() => ({
    box: {
        padding: '12px',
        boxShadow: '0 3px 5px 0 rgb(0 0 0 / 10%)',
        height: 683,
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

export default function Medications(props: { rxs: { data: MedicationsProps[], meta: MetaProps }, query: any, clientId: string }): ReactElement {
    const classes = useStyles();
    const { isFetching, isFetchingRxs, fetchRxs } = useAppState();
    // hook for default state of the query params to use
    const [dataSource, setDataSource] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [meta, setMeta] = React.useState({ count: 0, limit: 10, page: 1 });

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

    /**
     * @description Handle pagination events
     * @param {any} event
     * @param {number} newPage
     * @author Frank Corona Prendes <frank.corona@primavera,care>
     */
    const handleChangePage = (event: unknown, newPage: number) => {
        fetchRxs({ ...props.query, page: newPage + 1 }, props.clientId)
            .then((response) => {
                // @ts-ignore
                setDataSource(mappedInformation(response.data));
                setMeta(response.meta);
                setPage(newPage);
            })
    };

    /**
     * @description Handle event on change the limit per pages
     * @param {React.ChangeEvent<HTMLInputElement>} event
     * @author Frank Corona Prendes <frank.corona@primavera,care>
     */
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // using the hook for wait for the update of the props and update the datasource
    useEffect(() => {
        // @ts-ignore
        setDataSource(mappedInformation(props.rxs.data));
        // @ts-ignore
        setMeta(props.rxs.meta);
    }, [props.rxs])

    return (
        <Paper className={classes.box}>
            <Typography variant='h5' component='h1' gutterBottom align="left">
                Medications
            </Typography>
            <Divider/>
            {(isFetching || isFetchingRxs)
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
                    {!isEmpty(meta) &&
                    <TablePagination
                        rowsPerPageOptions={[10]}
                        component="div"
                        count={meta.count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    }
                </>
            }
            <Divider/>
        </Paper>
    );
}
