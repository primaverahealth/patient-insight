import React, { ReactElement, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import {
    Avatar,
    Chip,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import moment from 'moment';
import { includes, keys, map } from 'lodash';

import Divider from '../../common/Divider/Divider';
import { getDate, getMonthsBetweenDates, width_100 } from '../../utils';
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
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}))

export default function MemberTrendTracker(props: { trend: any }): ReactElement {
    const classes = useStyles();
    // Handling React Hooks
    const [filterAvatar, setFilterAvatar] = useState('R');
    const [isRevenue, setIsRevenue] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const [columns, setColumns] = useState([]);

    const handleFilter = () => {
        setIsRevenue((prevState => !prevState));
    }
    useEffect(() => {
        const { from, to } = getDate('l6m');
        const months = getMonthsBetweenDates(moment(from), moment(to));

        /**
         * Conform data-source for datatable.
         * dataSource = [{'': 'Status', 'Nov, 2017': 1, 'Dec, 2017': 0}]
         */
        const source: any = {};
        source[''] = 'Status';
        const responseMonths = map(props.trend, (item) => {
            return moment(item.date).format('MMM, YYYY');
        });
        months.map((month: string) => source[month] = includes(responseMonths, month) ? 'active' : 'inactive');

        // @ts-ignore
        setColumns(keys(source));
        // @ts-ignore
        setDataSource(source)

        // update the avatar
        setFilterAvatar(() => isRevenue ? 'R' : 'E');
        // make the API call
        // ...
    }, [isRevenue, props.trend])

    return (
        <Paper elevation={1} className={classes.box}>
            <div className={classes.headerContainer}>
                <Typography variant='h5' component='h1' gutterBottom align="left">
                    Member Tracker / Trend Graphic
                </Typography>
                <Chip
                    avatar={<Avatar>{filterAvatar}</Avatar>}
                    label={isRevenue ? 'Revenue' : 'Eligibility'}
                    clickable
                    onClick={handleFilter}
                    color={isRevenue ? 'primary' : 'secondary'}
                />
            </div>
            <Divider/>
            <TableContainer>
                <Table className={classes.table} size="medium" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell align="left" key={column}>{column}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column} align="center">
                                    <TrendStatus value={dataSource[column]}/>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
