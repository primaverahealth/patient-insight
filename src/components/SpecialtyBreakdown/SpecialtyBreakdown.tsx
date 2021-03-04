import React, { ReactElement } from 'react';
import { LinearProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { sumBy, round, divide, multiply, find, isUndefined, isEmpty } from 'lodash';
import NumberFormat from 'react-number-format';

import { useAppState } from '../../state';
import Divider from '../../common/Divider/Divider';
import NoDataDisplay from '../../common/NoDataDisplay/NoDataDisplay';
import { width_100, height_100 } from '../../utils';

interface FinancialData {
    keyName: string;
    value: number
}

interface SpecialistRowProps {
    specialist: string;
    spent: number;
    value: number;
}
export interface FinancialSummary {
    groupData: string;
    data: FinancialData[]
}

export interface SpecialtyBreakdownProps {
    summary: FinancialSummary[]
}

const useStyles = makeStyles(() => ({
    box: {
        padding: '12px',
        boxShadow: '0 3px 5px 0 rgb(0 0 0 / 10%)',
        height: height_100,
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

export default function SpecialtyBreakdown(props: SpecialtyBreakdownProps): ReactElement {
    const classes = useStyles();
    const { isFetching } = useAppState();
    const [dataSource, setDataSource] = React.useState([]);

    /**
     * @description Map and conform Data Source
     * @param {FinancialData[]} data
     * @author Frank Corona Prendes <frank.corona@primavera.care>
     */
    const initSource = (data: FinancialData[]) => {
        const mainSource: SpecialistRowProps[] = [];
        const spentAmount = sumBy(data, 'value');

        data.forEach((item) => {
            mainSource.push({
                specialist: item.keyName,
                spent: item.value,
                // Calculate the percent that represent item spent from total.
                value: round(divide(multiply(item.value, 100), spentAmount), 2),
            });
        });

        // @ts-ignore
        setDataSource(mainSource);
    }

    React.useEffect(() => {
        if (!isEmpty(props.summary)) {
            // Get specialist for current member.
            const specialist = find(props.summary, ['groupData', 'specialist']) || undefined;
            !isUndefined(specialist) && initSource(specialist.data);
        }
    }, [props.summary])

    return (
        <Paper className={classes.box}>
            <Typography variant='h5' component='h1' gutterBottom align="left">
                Specialty Breakdown
            </Typography>
            <Divider />
            {(isFetching)
                ? <LinearProgress />
                : <>
                    {!isEmpty(dataSource)
                        ? <TableContainer>
                            <Table className={classes.table} size="medium" aria-label="medications table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Type of Service</TableCell>
                                        <TableCell align="right">Paid Amount</TableCell>
                                        <TableCell align="right">% of Utilization</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataSource.map((row: SpecialistRowProps, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell align="left">
                                                <Typography variant={'body2'} className={classes.action}>
                                                    {row.specialist}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <NumberFormat
                                                    value={row.spent}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    decimalScale={2}
                                                    prefix={'$'} />
                                            </TableCell>
                                            <TableCell align="right">
                                                <NumberFormat
                                                    value={row.value}
                                                    displayType={'text'}
                                                    decimalScale={2}
                                                    suffix={'%'} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        : <NoDataDisplay />
                    }
                </>
            }
        </Paper>
    );
}
