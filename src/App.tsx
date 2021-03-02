import React, { ReactElement, useEffect, useState } from 'react';
import { Backdrop, Box, CircularProgress, Container, makeStyles, Theme, Typography } from '@material-ui/core';
import Copyright from './components/Copyright/Copyright';
import Summary from './components/Summary/Summary';
import HCCs from './components/HCCs/HCCs';

import { width_100 } from './utils/WidthUtils';
import { ClientConfiguration } from './interfaces';
import { useAppState } from './state';
import MemberTrendTracker from './components/MemberTrendTracker/MemberTrendTracker';
import InpatientOutpatient from './components/InpatientOutpatient/InpatientOutpatient';
import Specialists from './components/Specialists/Specialists';
import Medications from './components/Medications/Medications';
import SpecialtyBreakdown from './components/SpecialtyBreakdown/SpecialtyBreakdown';
import SectionFinancial from './components/SectionFinancial/SectionFinancial';

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
    const { isFetching, fetchData } = useAppState();
    // react hooks
    const [clientId] = useState(client.clientId);
    const [query] = useState({
        patientId: client.patientId,
        from: "2020-04-01",
        to: "2021-03-01"
    });
    const [financialSummary, setFinancialSummary] = useState({});
    const [hospitalPivot, setHospitalPivot] = useState({});

    /**
     * @description Using AppState to get all nested data for components
     * @author Frank Corona Prendes <frank.corona@primavera.care>
     */
    const fetchAllata = () => {
        fetchData(query, clientId)
            .then(({ financialMember, hospPivot }) => {
                financialMember.then(({ data }: any) => setFinancialSummary(data));
                hospPivot.then(({ data }: any) => setHospitalPivot(data));
            });
    };

    // using the hook for fech data on mount component
    useEffect(() => {
        fetchAllata()
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
                    <MemberTrendTracker/>
                    <div className={classes.specialists}>
                        <Specialists/>
                        <InpatientOutpatient/>
                    </div>
                    <Medications/>
                    <SpecialtyBreakdown/>
                    <Copyright/>
                </Box>
            </>
            }
        </Container>
    );
}
