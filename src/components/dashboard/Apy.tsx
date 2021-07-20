import React from "react";
import parser from '../../utils/GroStatsParser';
import apy1 from '../../data/apy1';
import apy2 from '../../data/apy2';
import system from '../../data/system';
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

const rows = [
    parser(apy1, 'apy_last24h', 'last 24h - pwrd', 'percentage'),
    parser(apy2, 'apy_last24h', 'last 24h - gvt', 'percentage'),
    parser(apy1, 'apy_last7d', 'last 7d - pwrd', 'percentage'),
    parser(apy2, 'apy_last7d', 'last 7d - gvt', 'percentage'),
    parser(apy1, 'apy_daily', 'last 24h - pwrd', 'percentage'),
    parser(apy2, 'apy_daily', 'last 24h - gvt', 'percentage'),
    parser(apy1, 'apy_weekly', 'last 24h - pwrd', 'percentage'),
    parser(apy2, 'apy_weekly', 'last 24h - gvt', 'percentage'),
    parser(apy1, 'apy_monthly', 'last 24h - pwrd', 'percentage'),
    parser(apy2, 'apy_monthly', 'last 24h - gvt', 'percentage'),
    parser(apy1, 'apy_all_time', 'last 24h - pwrd', 'percentage'),
    parser(apy2, 'apy_all_time', 'last 24h - gvt', 'percentage'),
    parser(system, 'hodl_bonus', 'HODL bonus', 'percentage'),
];

const Apy = () => {
    const classes = useStyles();

    return (
        <div className={styles.table}>
            <div className={styles.title}> APY </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {showHeaders()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.key}>
                                <TableCell component="th" scope="row">{row.kpi}</TableCell>
                                {showRows(row)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}

export default Apy;
