import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import {
    Chip,
    Collapse,
    LinearProgress,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme
} from '@material-ui/core';
import moment from 'moment';
import { includes, keys, map } from 'lodash';

import Divider from '../../common/Divider/Divider';
import { getMonthsBetweenDates, width_100 } from '../../utils';
import TrendStatus from '../TrendStatus/TrendStatus';
import { useAppState } from '../../state';

export interface TrendProps {
    data: any[],
    date: string
}

const useStyles = makeStyles((theme: Theme) => ({
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
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    }
}))

export default function MemberTrendTracker(props: { trend: TrendProps[], toggleSource: Function, query: any }): ReactElement {
    const classes = useStyles();
    const { isFetchingTrend } = useAppState();
    // Handling React Hooks
    const [isRevenue, setIsRevenue] = React.useState(true);
    const [dataSource, setDataSource] = React.useState([]);
    const [columns, setColumns] = React.useState([]);

    const handleFilter = () => {
        setIsRevenue((prevState => !prevState));
        const source = !isRevenue ? 'mmr' : 'eligibility';
        props.toggleSource(source);
    }

    React.useEffect(() => {
        const { from, to } = props.query;
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
    }, [props.trend, props.query])

    return (
        <Paper elevation={1} className={classes.box}>
            <div className={classes.headerContainer}>
                <Typography variant='h5' component='h1' gutterBottom align="left">
                    Member Tracker / Trend Graphic
                </Typography>
                <Chip
                    label={isRevenue ? 'Revenue' : 'Eligibility'}
                    clickable
                    onClick={handleFilter}
                    color={isRevenue ? 'primary' : 'secondary'}
                />
            </div>
            <Divider />
            {isFetchingTrend && <LinearProgress />}
            <Collapse in={!isFetchingTrend}>
                <TableContainer>
                    <Table className={classes.table} size="medium" aria-label="patient trend tracker">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell width={"170"} align="left" key={column}>{column}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell width={"170"} key={column} align="center">
                                        <TrendStatus value={dataSource[column]} />
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Collapse>
        </Paper>
    );
}
