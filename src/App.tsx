import React, { ReactElement } from 'react';

export interface ClientConfiguration {
    clientId: string;
    patientId: string;
}

/**
 * @description Sample App application
 * @param {ClientConfiguration} client
 * @author Frank Corona Prendes <frankdavid.corona@gmail.com>
 */
export default function App(client: ClientConfiguration): ReactElement {
    return (
        <h1>My React and TypeScript Embedded using clientId {client.clientId} and patientId {client.patientId}!</h1>
    );
}
