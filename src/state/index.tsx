import React, { createContext, useContext } from 'react';
import { omit } from 'lodash';

import { fetchProps } from '../interfaces';


export interface StateContextType {
    error: Error | null;
    isFetching: boolean,
    isFetchingTrend: boolean,
    isFetchingRxs: boolean,

    setError(error: Error | null): void;

    fetchData(params: fetchProps, clientId: string): Promise<any>;

    fetchTrend(params: fetchProps, clientId: string): Promise<any>;

    fetchRxs(params: fetchProps, clientId: string): Promise<any>;
}

export const StateContext = createContext<StateContextType>(null!);

export default function AppStateProvider(props: React.PropsWithChildren<{}>): JSX.Element {
    const [error, setError] = React.useState<Error | null>(null);
    const [isFetching, setIsFetching] = React.useState(false);
    const [isFetchingTrend, setIsFetchingTrend] = React.useState(false);
    const [isFetchingRxs, setIsFetchingRxs] = React.useState(false);

    let contextValue = {
        error,
        setError,
        isFetching,
        isFetchingTrend,
        isFetchingRxs,
    } as StateContextType;

    contextValue = {
        ...contextValue,

        /**
         * @description Fetch all data inside the same Promise
         * @param params
         * @param clientId
         * @author Frank Corona Prendes <frank.corona@primavera.care>
         */
        fetchData: async (params: fetchProps, clientId: string) => {
            return Promise.all([
                fetch(`https://api.primaverahealthcare.com/financial-summary-detail/pivot`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'x-tenant': clientId
                    },
                    body: JSON.stringify({ ...omit(params, ['source']) }),
                }),

                fetch(`https://api.primaverahealthcare.com/financial-member/${params.patientId}`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'x-tenant': clientId
                    },
                    body: JSON.stringify({ ...omit(params, ['source', 'patientId']) }),
                }),

                fetch(`https://api.primaverahealthcare.com/hospitalization/pivot`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'x-tenant': clientId
                    },
                    body: JSON.stringify({
                        patientId: params.patientId,
                        groupBy: 'byType'
                    }),
                }),

                fetch(`https://api.primaverahealthcare.com/members/trend`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'x-tenant': clientId
                    },
                    body: JSON.stringify({ ...params }),
                }),

                fetch(`https://api.primaverahealthcare.com/rx`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'x-tenant': clientId
                    },
                    body: JSON.stringify({
                        sortBy: "-paidDate,-paidAmount",
                        limit: 10,
                        page: 1,
                        ...omit(params, ['source']),
                    }),
                })
            ]).then(([pivot, financialMember, hospPivot, trend, medications]) => {
                return {
                    pivot: pivot.json(),
                    financialMember: financialMember.json(),
                    hospPivot: hospPivot.json(),
                    trend: trend.json(),
                    medications: medications.json()
                }
            })
        },

        fetchTrend: async (params: fetchProps, clientId: string) => {
            return fetch(`https://api.primaverahealthcare.com/members/trend`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'x-tenant': clientId
                },
                body: JSON.stringify({ ...params }),
            }).then(response => response.json());
        },

        fetchRxs: async (params: fetchProps, clientId: string) => {
            return fetch(`https://api.primaverahealthcare.com/rx`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'x-tenant': clientId
                },
                body: JSON.stringify({
                    sortBy: "-paidDate,-paidAmount",
                    limit: 10,
                    page: 1,
                    ...omit(params, ['source']),
                }),
            }).then(response => response.json());
        },
    }

    const fetchData: StateContextType['fetchData'] = (params: fetchProps, clientId: string) => {
        setIsFetching(true);
        return contextValue
            .fetchData(params, clientId)
            .then(res => {
                setIsFetching(false);
                return res;
            })
            .then(data => data)
            .catch(err => {
                setError(err);
                setIsFetching(false);
                return Promise.reject(err);
            });
    };

    const fetchTrend: StateContextType['fetchTrend'] = (params: fetchProps, clientId: string) => {
        setIsFetchingTrend(true);
        return contextValue
            .fetchTrend(params, clientId)
            .then(res => {
                setIsFetchingTrend(false);
                return res;
            })
            .then(data => data)
            .catch(err => {
                setError(err);
                setIsFetchingTrend(false);
                return Promise.reject(err);
            });
    };

    const fetchRxs: StateContextType['fetchRxs'] = (params: fetchProps, clientId: string) => {
        setIsFetchingRxs(true);
        return contextValue
            .fetchRxs(params, clientId)
            .then(res => {
                setIsFetchingRxs(false);
                return res;
            })
            .then(data => data)
            .catch(err => {
                setError(err);
                setIsFetchingRxs(false);
                return Promise.reject(err);
            });
    };

    return <StateContext.Provider
        value={{
            ...contextValue,
            fetchData,
            fetchTrend,
            fetchRxs,
        }}>{props.children}
    </StateContext.Provider>;
}

export function useAppState(): StateContextType {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('useAppState must be used within the AppStateProvider');
    }
    return context;
}
