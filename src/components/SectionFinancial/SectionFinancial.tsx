import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core';

import MRA from './MRA';
import ERVisits from './ERVisits';
import IPAdmits from './IPAdmits';
import EFR from './EFR';
import MLR from './MLR';
import GDR from './GDR';
import Readmissions from './Readmissions';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
}))

export default function SectionFinancial(): ReactElement {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <MRA/>
                <ERVisits/>
                <IPAdmits/>
            </div>
            <div className={classes.root}>
                <EFR/>
                <MLR/>
                <GDR/>
                <Readmissions/>
            </div>
        </div>
    );
}
