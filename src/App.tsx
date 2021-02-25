import React, { ReactElement } from 'react';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import Copyright from './components/Copyright/Copyright';
import Summary from './components/Summary/Summary';
import HCCs from './components/HCCs/HCCs';

import { width_100 } from './utils/WidthUtils';
import { ClientConfiguration } from './interfaces/ClientConfiguration';
import SectionFinancial from './components/SectionFinancial/SectionFinancial';
import MemberTrendTracker from './components/MemberTrendTracker/MemberTrendTracker';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: width_100
    },
    box: {
        width: 'inherit'
    }
}))

/**
 * @description Sample App application
 * @param {ClientConfiguration} client
 * @author Frank Corona Prendes <frankdavid.corona@gmail.com>
 */
export default function App(client: ClientConfiguration): ReactElement {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Box className={classes.box}>
                <Typography variant='h4' component='h1' gutterBottom>
                    Patient Insight {client.patientId}!
                </Typography>
                <Summary/>
                <HCCs/>
                <SectionFinancial/>
                <MemberTrendTracker/>
                <Copyright/>
            </Box>
        </Container>
    );
}
