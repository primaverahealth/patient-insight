import React, { createContext, useContext, useState } from 'react';
import { omit } from 'lodash';

import { fetchPivotProps, FinancialMemberResponse } from '../interfaces';


export interface StateContextType {
    error: Error | null;
    isFetching: boolean,
    isFetchingFinancial: boolean,
    isFetchingHospPivot: boolean,
    isFetchingPivot: boolean,

    setError(error: Error | null): void;

    fetchData(params: fetchPivotProps, clientId: string): Promise<any>;

    fetchPivot(params: fetchPivotProps, clientId: string): Promise<Response>;

    fetchMemberFinancial(params: fetchPivotProps, clientId: string): Promise<FinancialMemberResponse>;

    fetchHospitalizationPivot(patientId: string, clientId: string): Promise<Response>;
}

export const StateContext = createContext<StateContextType>(null!);

export default function AppStateProvider(props: React.PropsWithChildren<{}>): JSX.Element {
    const [error, setError] = useState<Error | null>(null);
    const [isFetchingFinancial, setIsFetchingFinancial] = useState(false);
    const [isFetchingHospPivot, setIsFetchingHospPivot] = useState(false);
    const [isFetchingPivot, setIsFetchingPivot] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    let contextValue = {
        error,
        setError,
        isFetching,
        isFetchingFinancial,
        isFetchingHospPivot,
        isFetchingPivot
    } as StateContextType;

    contextValue = {
        ...contextValue,

        /**
         * @description Fetch all data inside the same Promise
         * @param params
         * @param clientId
         * @author Frank Corona Prendes <frank.corona@primavera.care>
         */
        fetchData: async (params: fetchPivotProps, clientId: string) => {
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
                })
            ]).then(([pivot, financialMember, hospPivot, trend]) => {
                return {
                    pivot: pivot.json(),
                    financialMember: financialMember.json(),
                    hospPivot: hospPivot.json(),
                    trend: trend.json()
                }
            })
        },

        /**
         * @description Fetch financial member data
         * @param params
         * @param clientId
         * @author Frank Corona Prendes <frank.corona@primavera.care>
         */
        fetchMemberFinancial: async (params: fetchPivotProps, clientId: string) => {
            // Omit specific key from object using vanilla: https://stackoverflow.com/a/60195209/3724184
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { patientId, ...queryParams } = params;
            return fetch(`https://api.primaverahealthcare.com/financial-member/${params.patientId}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'x-tenant': clientId
                },
                body: JSON.stringify({ ...queryParams }),
            }).then(response => response.json());
        },

        /**
         * @description Fetch financial summary pivot data
         * @param params
         * @param clientId
         * @author Frank Corona Prendes <frank.corona@primavera.care>
         */
        fetchPivot: async (params: fetchPivotProps, clientId: string) => {
            return fetch(`https://api.primaverahealthcare.com/financial-summary-detail/pivot`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'x-tenant': clientId
                },
                body: JSON.stringify({ ...params }),
            }).then(response => response.json());
        },

        /**
         * @description Fetch hospitalization pivot data
         * @param patientId
         * @param clientId
         * @author Frank Corona Prendes <frank.corona@primavera.care>
         */
        fetchHospitalizationPivot: async (patientId: string, clientId: string) => {
            return fetch(`https://api.primaverahealthcare.com/hospitalization/pivot`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'x-tenant': clientId
                },
                body: JSON.stringify({ patientId, groupBy: 'byType' }),
            }).then(response => response.json());
        }
    }

    const fetchPivot: StateContextType['fetchPivot'] = (params: fetchPivotProps, clientId: string) => {
        setIsFetchingPivot(true);
        return contextValue
            .fetchPivot(params, clientId)
            .then(res => {
                setIsFetchingPivot(false);
                return res;
            })
            .then(data => data)
            .catch(err => {
                setError(err);
                setIsFetchingPivot(false);
                return Promise.reject(err);
            });
    };

    const fetchHospitalizationPivot: StateContextType['fetchHospitalizationPivot'] = (patientId: string, clientId: string) => {
        setIsFetchingHospPivot(true);
        return contextValue
            .fetchHospitalizationPivot(patientId, clientId)
            .then(res => {
                setIsFetchingHospPivot(false);
                return res;
            })
            .then(data => data)
            .catch(err => {
                setError(err);
                setIsFetchingHospPivot(false);
                return Promise.reject(err);
            });
    };

    const fetchMemberFinancial: StateContextType['fetchMemberFinancial'] = (params: fetchPivotProps, clientId: string) => {
        setIsFetchingFinancial(true);
        return contextValue
            .fetchMemberFinancial(params, clientId)
            .then(res => {
                setIsFetchingFinancial(false);
                return res;
            })
            .then(data => data)
            .catch(err => {
                setError(err);
                setIsFetchingFinancial(false);
                return Promise.reject(err);
            });
    };

    const fetchData: StateContextType['fetchData'] = (params: fetchPivotProps, clientId: string) => {
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

    return <StateContext.Provider
        value={{
            ...contextValue,
            fetchData,
            fetchMemberFinancial,
            fetchPivot,
            fetchHospitalizationPivot
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
