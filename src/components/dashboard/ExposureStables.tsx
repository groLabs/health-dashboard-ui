import React from "react";
import parser from '../../utils/GroStatsParser';
import protocols from '../../data/protocols';
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

let rows: { kpi: string; name: string, now: any; _5m: any; _5m_dif: any; _1h: any; _1h_dif: any; _1d: any; _1d_dif: any; _1w: any; _1w_dif: any; format: string; }[] = [];

const calcVaults = () => {
    for (const item of protocols) {
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
            <div className={styles.title}> Exposure Stablecoins </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>KPI</TableCell>
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
                                <TableCell component="td" scope="row"> {row.name}</TableCell>
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

export default ExposureStables;
