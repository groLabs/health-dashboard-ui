import React from "react";
import parser from '../../utils/GroStatsParser';
import tvl from '../../data/tvl';
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
    parser(tvl, 'tvl_pwrd', 'pwrd', 'amount'),
    parser(tvl, 'tvl_gvt', 'gvt', 'amount'),
    parser(tvl, 'tvl_total', 'total', 'amount'),
    parser(tvl, 'util_ratio_limit_pwrd', 'util ratio pwrd', 'percentage'),
    parser(tvl, 'util_ratio_limit_gvt', 'util ratio gvt', 'percentage'),
    parser(tvl, 'util_ratio', 'util ratio total', 'percentage'),
];

const Tvl = () => {
    const classes = useStyles();

    return (
        <div className={styles.table}>
            <div className={styles.title}> TVL </div>
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
                                <TableCell component="th" scope="row"> {row.kpi}</TableCell>
                                {showRows(row)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}

export default Tvl;
