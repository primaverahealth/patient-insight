import React, { ReactElement } from 'react';
import { List, ListItem, ListItemText, makeStyles, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { takeRight, map, toInteger, each, isNil, find, isEmpty, orderBy } from 'lodash';

import { width_50 } from '../../utils/WidthUtils';
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

const useStyles = makeStyles(() => ({
    box: {
        padding: '12px',
        boxShadow: '0 3px 5px 0 rgb(0 0 0 / 10%)',
        height: 350,
        margin: '12px 4px',
        width: width_50,
    },
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
}))

export default function HCCs(props: { hccCodes: HccProps[] }): ReactElement {
    const classes = useStyles();
    const [dataSource, setDataSource] = React.useState([]);
    const [boxHeight, setBoxHeight] = React.useState(0);

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

        // trick to calculate dymanically the height of the boxes based on the highest length
        const values = map(dataResponse, 'hccCodes');
        const lengths = values.map(a => a.length);
        const max = Math.max(...lengths);
        const newBoxHeight = max * 60;
        setBoxHeight(newBoxHeight);

        return dataResponse;
    }

    React.useEffect(() => {
        // @ts-ignore
        setDataSource(processDataHcc(props.hccCodes))
    }, [props.hccCodes])


    return (
        <div className={classes.root}>
            {dataSource.map((item: HccCodesProps, index: number) => (
                <Paper className={classes.box} key={index} style={{ height: boxHeight }}>
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
