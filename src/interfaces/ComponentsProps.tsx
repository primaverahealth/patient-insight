export interface ComponentsProps {
    header: string,
    query: {
        patientId: string,
        from?: string,
        to?: string,
    }
}
