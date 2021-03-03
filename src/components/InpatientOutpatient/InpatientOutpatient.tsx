import React, { ReactElement } from 'react';
import {
    LinearProgress,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { isEmpty } from 'lodash';
import NumberFormat from 'react-number-format';

import { useAppState } from '../../state';
import { width_100 } from '../../utils';
import { ClaimsProps, MetaProps } from '../../interfaces';
import Divider from '../../common/Divider/Divider';

const useStyles = makeStyles(() => ({
    box: {
        padding: '12px',
        boxShadow: '0 3px 5px 0 rgb(0 0 0 / 10%)',
        height: 683,
        margin: '12px 4px'
    },
    table: {
        width: width_100,
    },
}))

export default function InpatientOutpatient(props: { inpatient: { data: ClaimsProps[], meta: MetaProps }, query: any, clientId: string }): ReactElement {
    const classes = useStyles();
    const { isFetching, isFetchingInpatient, fetchInpatient } = useAppState();
    // hook for default state of the query params to use
    const [dataSource, setDataSource] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [meta, setMeta] = React.useState({ count: 0, limit: 10, page: 1 });
    const [boxHeight, setBoxHeight] = React.useState(0);
    /**
     * @description Mapping data to represent information.
     * @param {ClaimsProps[]} data
     * @author Frank Corona Prendes <frank.corona@primavera.care>
     */
    const mappedInformation = (data: ClaimsProps[]) => {
        return data.map(({
            provName,
            speciality,
            diagnoses,
            dateService,
            paidAmount,
            claimId,
            claimType,
            primaryDiagnosis
        }) => {
            // String: Primary  diagnose code - primary diagnose description.
            primaryDiagnosis = `${primaryDiagnosis.code} ${(!Object.is(primaryDiagnosis.description, '')) ? ` - ${primaryDiagnosis.description}` : ``}  `;

            return {
                provName,
                speciality,
                diagnoses,
                dateService,
                paidAmount,
                claimId,
                claimType,
                primaryDiagnosis,
                rowLink: true
            };
        });
    }

    /**
     * @description Calculate de possible box height based on rows
     * @param {number} rows
     * @author Frank Corona Prendes <frank.corona@primavera,care>
     */
    const getBoxHeight = (rows: number) => (rows < 10) ? rows * 115 : 683;

    /**
     * @description Handle pagination events
     * @param {any} event
     * @param {number} newPage
     * @author Frank Corona Prendes <frank.corona@primavera,care>
     */
    const handleChangePage = (event: unknown, newPage: number) => {
        fetchInpatient({ ...props.query, page: newPage + 1 }, props.clientId)
            .then((response) => {
                // @ts-ignore
                setDataSource(mappedInformation(response.data));
                setMeta(response.meta);
                setPage(newPage);
                const newBoxHeight = getBoxHeight(response.data.length);
                setBoxHeight(newBoxHeight);
            })
    };

    /**
     * @description Handle event on change the limit per pages
     * @param {React.ChangeEvent<HTMLInputElement>} event
     * @author Frank Corona Prendes <frank.corona@primavera,care>
     */
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // using the hook for wait for the update of the props and update the datasource
    React.useEffect(() => {
        // @ts-ignore
        setDataSource(mappedInformation(props.inpatient.data));
        // @ts-ignore
        setMeta(props.inpatient.meta);
        const newBoxHeight = getBoxHeight(props.inpatient.data.length);
        setBoxHeight(newBoxHeight);
    }, [props.inpatient])


    return (
        <Paper className={classes.box} style={{ height: boxHeight }}>
            <Typography variant='h5' component='h1' gutterBottom align="left">
                Inpatient/Outpatient
            </Typography>
            <Divider />
            {(isFetching || isFetchingInpatient)
                ? <LinearProgress />
                : <>
                    <TableContainer>
                        <Table className={classes.table} size="medium" aria-label="medications table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Claim Type</TableCell>
                                    <TableCell align="left">DOS</TableCell>
                                    <TableCell align="right">Paid Amount</TableCell>
                                    <TableCell align="left">Disgnosis</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataSource.map((row: ClaimsProps, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell align="left">
                                            <Typography variant={'body2'}>{row.claimType}</Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography variant={'body2'}>{row.dateService}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <NumberFormat
                                                value={row.paidAmount}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                decimalScale={2}
                                                prefix={'$'} />
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography variant={'body2'}>{row.primaryDiagnosis}</Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {(!isEmpty(meta) && meta.count >= 10) &&
                        <TablePagination
                            rowsPerPageOptions={[10]}
                            component="div"
                            count={meta.count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    }
                </>
            }
        </Paper>
    );
}
