import React, { ReactElement } from 'react';
import { Backdrop, Box, CircularProgress, Container, makeStyles, Theme, Typography } from '@material-ui/core';
import Copyright from './components/Copyright/Copyright';
import Summary from './components/Summary/Summary';
import HCCs from './components/HCCs/HCCs';

import { width_100 } from './utils/WidthUtils';
import { ClientConfiguration } from './interfaces';
import SectionFinancial from './components/SectionFinancial/SectionFinancial';
import MemberTrendTracker from './components/MemberTrendTracker/MemberTrendTracker';
import InpatientOutpatient from './components/InpatientOutpatient/InpatientOutpatient';
import Specialists from './components/Specialists/Specialists';
import Medications from './components/Medications/Medications';
import SpecialtyBreakdown from './components/SpecialtyBreakdown/SpecialtyBreakdown';
import { useAppState } from './state';

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
    const { isFetching } = useAppState();
    const params = {
        header: client.clientId,
        query: {
            patientId: client.patientId,
            from: "2020-04-01",
            to: "2021-03-01"
        }
    };

    return (
        <Container className={classes.container}>
            <Backdrop className={classes.backdrop} open={isFetching}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Box className={classes.box}>
                <Typography variant='h4' component='h1' gutterBottom>
                    Patient Insight {client.patientId}!
                </Typography>
                <Summary query={params.query} header={params.header}/>
                <HCCs/>
                <SectionFinancial/>
                <MemberTrendTracker/>
                <div className={classes.specialists}>
                    <Specialists/>
                    <InpatientOutpatient/>
                </div>
                <Medications/>
                <SpecialtyBreakdown/>
                <Copyright/>
            </Box>
        </Container>
    );
}
