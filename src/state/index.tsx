import React, { createContext, useContext, useState } from 'react';

import { fetchPivotProps } from './getFinancialSummary';
import { FinancialMemberResponse } from '../interfaces';


export interface StateContextType {
    error: Error | null;
    isFetching: boolean,

    setError(error: Error | null): void;

    fetchPivot(params: fetchPivotProps, clientId: string): Promise<Response>;

    fetchMemberFinancial(params: fetchPivotProps, clientId: string): Promise<FinancialMemberResponse>;
}

export const StateContext = createContext<StateContextType>(null!);

export default function AppStateProvider(props: React.PropsWithChildren<{}>): JSX.Element {
    const [error, setError] = useState<Error | null>(null);
    const [isFetching, setIsFetching] = useState(false);

    let contextValue = {
        error,
        setError,
        isFetching,
    } as StateContextType;

    contextValue = {
        ...contextValue,
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
        fetchPivot: async (params: fetchPivotProps, clientId: string) => {
            return fetch(`https://api.primaverahealthcare.com/financial-summary-detail/pivot`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'x-tenant': clientId
                },
                body: JSON.stringify({ ...params }),
            }).then(response => response.json());
        }
    }

    const fetchPivot: StateContextType['fetchPivot'] = (params: fetchPivotProps, clientId: string) => {
        setIsFetching(true);
        return contextValue
            .fetchPivot(params, clientId)
            .then(res => {
                setIsFetching(false);
                return res.json();
            })
            .then(data => data.json())
            .catch(err => {
                setError(err);
                setIsFetching(false);
                return Promise.reject(err);
            });
    };

    const fetchMemberFinancial: StateContextType['fetchMemberFinancial'] = (params: fetchPivotProps, clientId: string) => {
        setIsFetching(true);
        return contextValue
            .fetchMemberFinancial(params, clientId)
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
            fetchMemberFinancial,
            fetchPivot
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
