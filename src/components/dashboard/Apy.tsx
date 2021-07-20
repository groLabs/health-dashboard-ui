import React from "react";
import parser from '../../utils/GroStatsParser';
import apy1 from '../../data/apy1';
import apy2 from '../../data/apy2';
import system from '../../data/system';
import styles from './Dashboard.module.css';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import format from '../../utils/Format';

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
                            <TableCell align="right">Now</TableCell>
                            <TableCell align="right">5m</TableCell>
                            <TableCell align="right">Δ 5m</TableCell>
                            <TableCell align="right">1h</TableCell>
                            <TableCell align="right">Δ 1h</TableCell>
                            <TableCell align="right">1d</TableCell>
                            <TableCell align="right">Δ 1d</TableCell>
                            <TableCell align="right">1w</TableCell>
                            <TableCell align="right">Δ 1w</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.kpi}>
                                <TableCell component="th" scope="row">{row.kpi}</TableCell>
                                <TableCell align="right">{format(row.now, row.format)}</TableCell>
                                <TableCell align="right">{format(row._5m, row.format)}</TableCell>
                                <TableCell align="right">{format(row._5m_dif, row.format)}</TableCell>
                                <TableCell align="right">{format(row._1h, row.format)}</TableCell>
                                <TableCell align="right">{format(row._1h_dif, row.format)}</TableCell>
                                <TableCell align="right">{format(row._1d, row.format)}</TableCell>
                                <TableCell align="right">{format(row._1d_dif, row.format)}</TableCell>
                                <TableCell align="right">{format(row._1w, row.format)}</TableCell>
                                <TableCell align="right">{format(row._1w_dif, row.format)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}

export default Apy;
