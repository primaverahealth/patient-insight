import React, { ReactElement, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { filter, get, isNil, round, sumBy } from 'lodash';

import MRA from './MRA';
import ERVisits from './ERVisits';
import IPAdmits from './IPAdmits';
import EFR from './EFR';
import MLR from './MLR';
import GDR from './GDR';
import Readmissions from './Readmissions';
import { useAppState } from '../../state';

export interface SectionFinancialProps {
    data: {
        financialSummary: any,
        hospitalPivot: any
    }
}

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
}))

export default function SectionFinancial(props: SectionFinancialProps): ReactElement {
    const classes = useStyles();

    const { isFetching } = useAppState();
    // hook for default state of the query params to use
    const [dataSource, setDataSource] = useState({});

    // using the hook for wait for the update of the props and update the datasource
    useEffect(() => {
        // @ts-ignore
        setDataSource(mappingSource());
    }, [props.data])

    const mappingSource = () => {
        const { financialSummary, hospitalPivot } = props.data;
        return {
            ipAdmits: financialSummary.ipAdmits || 0,
            totalIpAdmits: sumBy(get(hospitalPivot, 'byType'), 'patients') || 0,
            readmissions: financialSummary.readmissions || 0,
            totalReadmissions: sumBy(filter(get(hospitalPivot, 'byType'), { groupBy: 'READMISSION' }), 'patients') || 0,
            // @ts-ignore
            gdr: (!isNil(financialSummary.rxCount) && financialSummary.rxCount !== 0) ? round((financialSummary.rxGeneric / financialSummary.rxCount) * 100, 2) : 0,
            erVisits: financialSummary.er || 0,
            totalErVisits: sumBy(filter(get(hospitalPivot, 'byType'), { groupBy: 'ER' }), 'patients') || 0,
            lastMRA: financialSummary.lastMRA || 0,
            lastYearMRA: financialSummary.lastYearMRA || 0,
            mlr: financialSummary.mlr || 0,
            efr: financialSummary.efr || 0,
        }
    }


    return (
        <>
            {!isFetching &&
            <div>
                <div className={classes.root}>
                    <MRA data={dataSource}/>
                    <ERVisits data={dataSource}/>
                    <IPAdmits data={dataSource}/>
                </div>
                <div className={classes.root}>
                    <EFR data={dataSource}/>
                    <MLR data={dataSource}/>
                    <GDR data={dataSource}/>
                    <Readmissions data={dataSource}/>
                </div>
            </div>
            }
        </>
    );
}
