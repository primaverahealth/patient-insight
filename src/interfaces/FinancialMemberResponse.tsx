export interface FinancialMemberResponse {
    netPremium?: number,
    inpatient?: number,
    outpatient?: number,
    specialist?: number,
    totalRxExpenses?: number,
    netRevenue?: number,
    otc?: number,
    ipAdmits?: number,
    readmissions?: number,
    rxCount?: number,
    rxGeneric?: number,
    er?: number,
    lastMRA?: number,
    lastYearMRA?: number,
    mlr?: number,
    efr?: number,
    member?: {
        dob?: string,
        gender?: string,
        id?: string,
        name?: { first: string, last: string, middle: string }
    }
}
