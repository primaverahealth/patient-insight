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
