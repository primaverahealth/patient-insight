import React from "react";
import ReactDOM from "react-dom";

import App from './App';
import { ClientConfiguration } from './interfaces';
import AppStateProvider from './state';

/**
 * @description Init React application
 * @param {ClientConfiguration} client
 * @author Frank Corona Prendes <frank.corona@primavera,care>
 */
export const init = (client: ClientConfiguration): void => {
    ReactDOM.render(
        <AppStateProvider>
            <App clientId={client.clientId} patientId={client.patientId}/>
        </AppStateProvider>,
        document.getElementById("root")
    )
}

init({ clientId: '5ab930c364bfb1001b01b781', patientId: '5cde37727b58b1001a2661a4' });
