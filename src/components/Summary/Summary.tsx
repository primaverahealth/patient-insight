import React, { ReactElement, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import {
    LinearProgress,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import { isNil, mapValues } from 'lodash';
// https://www.npmjs.com/package/react-number-format
import NumberFormat from 'react-number-format';

import Divider from '../../common/Divider/Divider';
import { width_100 } from '../../utils/WidthUtils';
import { useAppState } from '../../state';
import { ComponentsProps, FinancialMemberResponse } from '../../interfaces';

const useStyles = makeStyles(() => ({
    box: {
        padding: '12px',
        boxShadow: '0 3px 5px 0 rgb(0 0 0 / 10%)',
        margin: '4px'
    },
    table: {
        width: width_100,
    }
}))

/**
 * @description Function Component for Summary section
 * @param {ComponentsProps} props
 * @constructor
 */
export default function Summary(props: ComponentsProps): ReactElement {
    const classes = useStyles();
    // prepare to use AppState
    const { fetchMemberFinancial, isFetching } = useAppState();
    // hook for default state of the query params to use
    const [query] = useState({ ...props.query });
    const [dataSource, setDataSource] = useState([]);

    /**
     * @description fetch data using the AppState
     * @author Frank Corona Prendes <frank.corona@primavera.care>
     */
    const fetchData = () => {
        fetchMemberFinancial(query, props.header)
            .then((response: any) => {
                // @ts-ignore
                setDataSource(mappedInformation([response.data]));
            });
    };

    // using the hook for fech data on mount component
    useEffect(() => {
        fetchData();
    }, [query])

    /**
     * @description Mapping data to represent information.
     * @param {FinancialMemberResponse} data
     * @author Frank Corona Prendes <frank.corona@primavera.care>
     */
    const mappedInformation = (data: FinancialMemberResponse[]) => {
        return data.map(({ netPremium, inpatient, outpatient, specialist, totalRxExpenses, netRevenue, otc }) => {
            const response = { netPremium, inpatient, outpatient, specialist, totalRxExpenses, netRevenue, otc };

            return mapValues(response, (value) => {
                if (isNil(value)) {
                    value = 0;
                }

                return value;
            });
        });
    }


    return (
        <Paper elevation={1} className={classes.box}>
            <Typography variant='h5' component='h1' gutterBottom align="left">
                Summary
            </Typography>
            {isFetching && <LinearProgress/>}
            {!isFetching &&
            <>
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
                            {dataSource.map((row: FinancialMemberResponse) => (
                                <TableRow key={row.inpatient}>
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
                                        <NumberFormat value={row.specialist}
                                                      displayType={'text'}
                                                      thousandSeparator={true}
                                                      decimalScale={2}
                                                      prefix={'$'}/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <NumberFormat value={row.totalRxExpenses}
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
            </>
            }
        </Paper>
    );
}
