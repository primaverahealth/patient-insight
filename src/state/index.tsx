import React, { createContext, useContext, useState } from 'react';
import { fetchMemberFinancial, fetchPivot, fetchPivotProps } from './getFinancialSummary';
import { FinancialMemberResponse } from '../interfaces';


export interface StateContextType {
    error: Error | null;

    setError(error: Error | null): void;

    getToken(name: string, room: string, passcode?: string): Promise<string>;

    fetchPivot(params: fetchPivotProps, clientId: string): Promise<Response>;

    fetchMemberFinancial(params: fetchPivotProps, clientId: string): Promise<FinancialMemberResponse>;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const StateContext = createContext<StateContextType>(null!);

// eslint-disable-next-line @typescript-eslint/ban-types
export default function AppStateProvider(props: React.PropsWithChildren<{}>): JSX.Element {
    const [error, setError] = useState<Error | null>(null);

    const contextValue = {
        error,
        setError,
        fetchPivot,
        fetchMemberFinancial,
    } as StateContextType;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getPivot: StateContextType['fetchPivot'] = (params, clientId) => {
        return contextValue
            .fetchPivot(params, clientId)
            .then(res => {
                return res.json();
            })
            .then(data => data.json())
            .catch(err => {
                setError(err);
                return Promise.reject(err);
            });
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const financialMember: StateContextType['fetchMemberFinancial'] = (params, clientId) => {
        return contextValue
            .fetchMemberFinancial(params, clientId)
            .then(res => {
                return res;
            })
            .then(data => data)
            .catch(err => {
                setError(err);
                return Promise.reject(err);
            });
    };

    return <StateContext.Provider
        value={{
            ...contextValue,
            fetchPivot,
            fetchMemberFinancial
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
