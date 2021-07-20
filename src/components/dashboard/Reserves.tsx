import React from "react";
import parser from '../../utils/GroStatsParser';
import reserves from '../../data/reserves';
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

let rows: { key: string, kpi: string; vault_name: string, reserve_name: string, now: any; _5m: any; _5m_dif: any; _1h: any; _1h_dif: any; _1d: any; _1d_dif: any; _1w: any; _1w_dif: any; format: string; }[] = [];

const calcVaults = () => {
    for (const item of reserves) {
        rows.push(
            parser(item, 'amount', 'amount', 'amount'),
            parser(item, 'share', 'share', 'percentage'),
            parser(item, 'last3d_apy', 'last3d_apy', 'percentage'),
        )
    }
}

calcVaults();

const Reserves = () => {
    const classes = useStyles();
    return (
        <div className={styles.table}>
            <div className={styles.title}> Reserves </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Vault</TableCell>
                            <TableCell>KPI</TableCell>
                            {showHeaders()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.key}>
                                <TableCell component="td" scope="row"> {row.vault_name}</TableCell>
                                <TableCell component="td" scope="row"> {row.reserve_name}</TableCell>
                                <TableCell component="td" scope="row"> {row.kpi}</TableCell>
                                {showRows(row)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Reserves;
