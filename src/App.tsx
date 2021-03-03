import React, { ReactElement, useEffect } from 'react';
import { Backdrop, Box, CircularProgress, Container, makeStyles, Theme, Typography } from '@material-ui/core';
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
import { width_100 } from './utils';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: width_100
    },
    box: {
        width: 'inherit'
    },
    specialists: {
        display: 'flex',
        flexDirection: 'row',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: 'primary',
    },
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
    const [query] = React.useState({
        patientId: client.patientId,
        from: "2020-10-01",
        to: "2021-03-02",
        source: 'mmr'
    });
    const [financialSummary, setFinancialSummary] = React.useState({});
    const [hospitalPivot, setHospitalPivot] = React.useState({});
    const [memberTrend, setMemberTrend] = React.useState([]);
    const [memberMedications, setMedications] = React.useState({ data: [], meta: {} });
    const [claimsSpecialists, setClaimsSpecialists] = React.useState({ data: [], meta: {} });

    /**
     * @description Using AppState to get all nested data for components
     * @author Frank Corona Prendes <frank.corona@primavera.care>
     */
    const fetchAllata = () => {
        fetchData(query, clientId)
            .then(({ financialMember, hospPivot, trend, medications, specialists }) => {
                financialMember.then(({ data }: any) => setFinancialSummary(data));
                hospPivot.then(({ data }: any) => setHospitalPivot(data));
                trend.then(({ data }: any) => setMemberTrend(data));
                medications.then((response: any) => setMedications(response));
                specialists.then((response: any) => setClaimsSpecialists(response));
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

    // using the hook for fech data on mount component
    useEffect(() => {
        fetchAllata();
    }, [query])

    return (
        <Container className={classes.container}>
            <Backdrop className={classes.backdrop} open={isFetching}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            {!isFetching &&
            <>
                <Box className={classes.box}>
                    <Typography variant='h4' component='h1' gutterBottom>
                        Patient Insight {client.patientId}!
                    </Typography>
                    <Summary summary={financialSummary}/>
                    <HCCs/>
                    <SectionFinancial data={{ financialSummary, hospitalPivot }}/>
                    <MemberTrendTracker trend={memberTrend} toggleSource={toggleSource}/>
                    <Specialists specialists={claimsSpecialists} query={query} clientId={clientId}/>
                    <InpatientOutpatient/>
                    <Medications rxs={memberMedications} query={query} clientId={clientId}/>
                    <SpecialtyBreakdown/>
                    <Copyright/>
                </Box>
            </>
            }
        </Container>
    );
}
