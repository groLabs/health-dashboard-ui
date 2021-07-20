import React from "react";
import parser from '../../utils/GroStatsParser';
import stables from '../../data/stables';
import styles from './Dashboard.module.css';
import { showHeaders, showRows } from './Kpis';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

let rows: { key: string, kpi: string; name: string, now: any; _5m: any; _5m_dif: any; _1h: any; _1h_dif: any; _1d: any; _1d_dif: any; _1w: any; _1w_dif: any; format: string; }[] = [];

const calcVaults = () => {
    for (const item of stables) {
        rows.push(
            parser(item, 'concentration', 'concentration', 'percentage'),
        )
    }
}

calcVaults();

const ExposureStables = () => {
    const classes = useStyles();
    return (
        <div className={styles.table}>
            <div className={styles.title}> Exposure Protocols </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>KPI</TableCell>
                            {showHeaders()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.key}>
                                <TableCell component="td" scope="row"> {row.name}</TableCell>
                                {showRows(row)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ExposureStables;
