import React from "react";
import ReactDOM from "react-dom";

import App from './App';
import { ClientConfiguration } from './interfaces';

/**
 * @description Init React application
 * @param {ClientConfiguration} client
 * @author Frank Corona Prendes <frankdavid.corona@gmail.com>
 */
export const init = (client: ClientConfiguration): void => {
    ReactDOM.render(
        <App clientId={client.clientId} patientId={client.patientId}/>,
        document.getElementById("root")
    )
}

init({ clientId: '064c46de-7783-11eb-9439-0242ac130002', patientId: 'Corona, Frank David' });
