import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Paper } from '@material-ui/core';
import moment from 'moment';
import Chart from 'chart.js';
import { map, find } from 'lodash';

import { height_100, NamePipe, getMonthsBetweenDates } from '../../utils';
import { FinancialMemberResponse } from '../../interfaces';

export interface MRAProps {
    date: string;
    groupBy: string;
    mra: number;
}

const useStyles = makeStyles(() => ({
    box: {
        padding: '12px',
        boxShadow: '0 3px 5px 0 rgb(0 0 0 / 10%)',
        height: height_100,
        margin: '12px 4px',
    },
    footer: {
        margin: '12px 4px',
    }
}))

export default function MRA(props: { mras: MRAProps[], financials: FinancialMemberResponse }): ReactElement {
    const classes = useStyles();
    const [riskSroce, setRiskScore] = React.useState(0);
    const [mras, setMRA] = React.useState([]);
    const [patientName, setPatientName] = React.useState('');
    const [chartLabels, setChartLabels] = React.useState(['']);
    const chartRef: any = React.createRef();

    /**
     * @description Conform the chart dataset
     * @param {MRAProps[]} data
     * @param {string[]} catRange
     * @author Frank Corona Prendes <frank.corona@primavera.care>
     */
    const datasets = (data: MRAProps[], catRange: string[]) => {
        const dataSource: number[] = [];
        const from = catRange[0];
        const to = catRange[catRange.length - 1];
        const monthsRange: string[] = getMonthsBetweenDates(moment(from), moment(to), 'YYYY-MM');

        monthsRange.forEach((month: string) => {
            // search the required month in categories of the chart
            if (catRange.indexOf(month) > -1) {
                // if find it, then populate data source with the mra value
                // @ts-ignore
                dataSource.push(find(data, ['date', month]).mra);
            }
            else {
                // else set 0 as default value
                dataSource.push(0);
            }
        })

        // [3.26, 1.5, 0, 0, 2.50]
        return dataSource;
    }

    React.useEffect(() => {
        // Get the Risk score from lastMra into financial member data
        setRiskScore(props.financials.lastMRA || 0);

        // Set the Patient Name, got from Financial information
        // @ts-ignore
        setPatientName(NamePipe(props.financials.member?.name));

        /**
         * @description Conform the chart labels sorted by date
         * @returns ["2020-10", "2020-11", "2020-12"]
         */
        const labels = map(props.mras, 'date').sort((a: any, b: any) => {
            a = new Date(a);
            b = new Date(b);
            if (a.getTime() < b.getTime()) {
                return -1;
            }
            if (a.getTime() < b.getTime()) {
                return 1;
            }

            return 0;
        });

        // Set the new value for Chart Labels
        setChartLabels(labels);

        // Set/update the Chart datasets
        const chartSource = datasets(props.mras, labels);
        // @ts-ignore
        setMRA(chartSource);

        // Define Chart to render, data, options, etc.
        new Chart(chartRef.current, {
            type: "line",
            data: {
                labels: chartLabels,
                datasets: [
                    {
                        label: patientName,
                        data: mras,
                        backgroundColor: [
                            "rgb(129,212,250)"
                        ],
                        borderColor: [
                            "rgb(129,212,250)"
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                legend: {
                    position: "bottom"
                }
            }
        });
    }, [props])

    return (
        <Paper elevation={1} className={classes.box}>
            <Typography variant='h5' component='h1' gutterBottom align="left">
                Risk Score: {riskSroce}
            </Typography>
            <canvas ref={chartRef} height="150"></canvas>
        </Paper>
    );
}
