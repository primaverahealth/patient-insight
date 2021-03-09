import React, { ReactElement } from 'react';
import { Backdrop, CircularProgress, makeStyles, Theme } from '@material-ui/core';
import * as dateFns from 'date-fns';
import format from 'date-fns/format';

import Copyright from './components/Copyright/Copyright';
import Summary from './components/Summary/Summary';
import HCCs from './components/HCCs/HCCs';
import { useAppState } from './state';
import { ClientConfiguration } from './interfaces';
import MemberTrendTracker from './components/MemberTrendTracker/MemberTrendTracker';
import InpatientOutpatient from './components/InpatientOutpatient/InpatientOutpatient';
import Specialists from './components/Specialists/Specialists';
import Medications from './components/Medications/Medications';
import SpecialtyBreakdown from './components/SpecialtyBreakdown/SpecialtyBreakdown';
import SectionFinancial from './components/SectionFinancial/SectionFinancial';
import MRA from './components/MRA/MRA';
import { width_100 } from './utils';
import DateRange from './common/DateRange/DateRange';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '12px'
    },
    box: {
        width: 'inherit'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: 'primary',
    },
    section: {
        [theme.breakpoints.down('sm')]: {
            width: width_100
        },
        [theme.breakpoints.up('sm')]: {
            width: width_100
        }
    }
}))

/**
 * @description Sample App application
 * @param {ClientConfiguration} client
 * @author Frank Corona Prendes <frank.corona@primavera.care>
 */
export default function App(client: ClientConfiguration): ReactElement {
    const classes = useStyles();
    // get from AppState the state of fetching actions
    const { isFetching, fetchData, fetchTrend } = useAppState();
    // react hooks
    const [clientId] = React.useState(client.clientId);
    const [query, setQuery] = React.useState({
        patientId: client.patientId,
        from: format(dateFns.startOfDay(dateFns.subMonths(new Date(), 5)), 'yyyy-MM-dd'),
        to: format(dateFns.endOfDay(new Date()), 'yyyy-MM-dd'),
        source: 'mmr'
    });
    const [financialSummary, setFinancialSummary] = React.useState({});
    const [financialSummaryDetail, setFinancialSummaryDetail] = React.useState([]);
    const [hospitalPivot, setHospitalPivot] = React.useState({});
    const [memberTrend, setMemberTrend] = React.useState([]);
    const [memberMedications, setMedications] = React.useState({ data: [], meta: {} });
    const [claimsSpecialists, setClaimsSpecialists] = React.useState({ data: [], meta: {} });
    const [claimsInpatient, setClaimsInpatient] = React.useState({ data: [], meta: {} });
    const [hccCodes, setHCCs] = React.useState([]);
    const [mra, setMRA] = React.useState([]);

    /**
     * @description Using AppState to get all nested data for components
     * @author Frank Corona Prendes <frank.corona@primavera.care>
     */
    const fetchAllata = () => {
        fetchData(query, clientId)
            .then(({ financialDetail, financialMember, hospPivot, trend, medications, specialists, inpatient, hcc, mras }) => {
                financialDetail.then(({ data }: any) => setFinancialSummaryDetail(data));
                financialMember.then(({ data }: any) => setFinancialSummary(data));
                hospPivot.then(({ data }: any) => setHospitalPivot(data));
                trend.then(({ data }: any) => setMemberTrend(data));
                medications.then((response: any) => setMedications(response));
                specialists.then((response: any) => setClaimsSpecialists(response));
                inpatient.then((response: any) => setClaimsInpatient(response));
                hcc.then(({ data }: any) => setHCCs(data));
                /**
                 * Annotation: In case we decide format the dates
                 * map(data, (item) => {
                        item.date = moment(new Date(item.date).toISOString()).format('MMM, YYYY');
                    });
                 */
                mras.then(({ data }: any) => setMRA(data));
            });
    };

    /**
     * @description Toggle source filter for Trend Tracker
     * @param {string} source
     * @author Frank Corona Prendes <frank.corona@primavera.care>
     */
    const toggleSource = (source: string) => {
        fetchTrend({ ...query, source }, clientId)
            .then((response) => setMemberTrend(response.data))
    }

    /**
     * @description Handle date changes
     * @param {Date[]} range
     * @author Frank Corona Prendes <frank.corona@primavera.care>
     */
    const onChangeDate = (range: Date[]) => {
        const from = format(range[0], 'yyyy-MM-dd');
        const to = format(range[1], 'yyyy-MM-dd');
        // update query for components
        setQuery({ ...query, from, to });
    }

    // using the hook for fech data on mount component
    React.useLayoutEffect(() => {
        fetchAllata();
    }, [query])

    return (
        <div className={classes.container}>
            <DateRange onChangeDate={onChangeDate} />
            <Backdrop className={classes.backdrop} open={isFetching}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {!isFetching &&
                <section className={classes.section}>
                    <Summary summary={financialSummary} />
                    <HCCs hccCodes={hccCodes} />
                    <SectionFinancial data={{ financialSummary, hospitalPivot }} />
                    <MemberTrendTracker trend={memberTrend} toggleSource={toggleSource} query={query} />
                    <Specialists specialists={claimsSpecialists} query={query} clientId={clientId} />
                    <InpatientOutpatient inpatient={claimsInpatient} query={query} clientId={clientId} />
                    <Medications rxs={memberMedications} query={query} clientId={clientId} />
                    <SpecialtyBreakdown summary={financialSummaryDetail} />
                    <MRA mras={mra} financials={financialSummary} />
                    <Copyright />
                </section>
            }
        </div>
    );
}
