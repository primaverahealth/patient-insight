import { FinancialMemberResponse } from '../interfaces';

export interface fetchPivotProps {
    from?: string,
    to?: string,
    patientId: string
}

/**
 * @description Fetch Financial pivot data for the Patient
 * @param {fetchPivotProps} params
 * @param {string} clientId
 * @author Frank Corona Prendes <frank.corona@primavera.care>
 */
export function fetchPivot(params: fetchPivotProps, clientId: string): Promise<Response> {
    return fetch(`https://api.primaverahealthcare.com/financial-summary-detail/pivot`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'x-tenant': clientId
        },
        body: JSON.stringify({ ...params }),
    }).then(response => response.json());
}

/**
 * @description Fetch Member Financial data for the Patient
 * @param {fetchPivotProps} params
 * @param {string} clientId
 * @author Frank Corona Prendes <frank.corona@primavera.care>
 */
export function fetchMemberFinancial(params: fetchPivotProps, clientId: string): Promise<FinancialMemberResponse> {
    // Omit specific key from object vanilla: https://stackoverflow.com/a/60195209/3724184
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
}
