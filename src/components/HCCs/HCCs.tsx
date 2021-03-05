import React, { ReactElement } from 'react';
import { List, ListItem, ListItemText, makeStyles, Paper, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { takeRight, map, toInteger, each, isNil, find, isEmpty, orderBy } from 'lodash';

import { width_50, width_100, height_100 } from '../../utils';
import Divider from '../../common/Divider/Divider';
import NoDataDisplay from '../../common/NoDataDisplay/NoDataDisplay';

export interface HccProps {
    year?: string,
    hccCodes?: any[]
}

export interface HccCode {
    code: number,
    description: string,
    check: boolean
}
export interface HccCodesProps {
    year: string,
    hccCodes: HccCode[]
}

const useStyles = makeStyles((theme: Theme) => ({
    box: {
        padding: '12px',
        boxShadow: '0 3px 5px 0 rgb(0 0 0 / 10%)',
        height: height_100,
        margin: '12px 4px',
        [theme.breakpoints.up('sm')]: {
            width: width_50,
        },
    },
    root: {
        magin: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between',
        width: width_100,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        },
    }
}))

export default function HCCs(props: { hccCodes: HccProps[] }): ReactElement {
    const classes = useStyles();
    const [dataSource, setDataSource] = React.useState([]);

    /**
     * @description Aux function to get if a HCC code already exist
     * @param {string} code
     * @param {number} year
     * @param {any} hccs
     * @author Frank Corona Prendes <frank.corona@primavera.care>
     */
    const codeExitFn = (code: number, year: number, hccs: any): boolean => {
        let codeExit = false;
        each(hccs, (item) => {
            if (toInteger(item.year) === year + 1) {
                codeExit = isNil(find(item.hccCodes, { code }));
            }
        });

        return codeExit;
    }

    /**
     * @description Map and prepare data to render
     * @param {any} data
     * @author Frank Corona Prendes <frank.corona@primavera.care>
     */
    const processDataHcc = (data: HccCodesProps[]): { year: string, hccCodes: any }[] => {
        data = takeRight(data, 2);
        let dataResponse = map(data, (item) => {
            map(item.hccCodes, (hcc: HccCode) => {
                hcc.check = codeExitFn(hcc.code, toInteger(item.year), data);
                hcc.code = toInteger(hcc.code);

                return hcc;
            });

            return {
                year: item.year,
                hccCodes: orderBy(
                    item.hccCodes,
                    'code', 'asc'
                ),
            };
        });

        if (isEmpty(dataResponse)) {
            dataResponse = [
                {
                    year: '',
                    hccCodes: [],
                },
            ];
        }

        return dataResponse;
    }

    React.useEffect(() => {
        // @ts-ignore
        setDataSource(processDataHcc(props.hccCodes))
    }, [props.hccCodes])


    return (
        <div className={classes.root}>
            {dataSource.map((item: HccCodesProps, index: number) => (
                <Paper className={classes.box} key={index}>
                    <Typography variant='h5' component='h1' gutterBottom align="left">
                        Reported HCCs {item.year}
                    </Typography>
                    <Divider />
                    {item.hccCodes.length
                        ? <List component="nav" aria-label="secondary mailbox folders">
                            {item.hccCodes.map((hcc: HccCode, i: number) => (
                                <ListItem key={i}>
                                    <ListItemText>{hcc.code} - {hcc.description}</ListItemText>
                                </ListItem>
                            ))}
                        </List>
                        : <NoDataDisplay />}
                </Paper>
            ))}
        </div>
    );
}
