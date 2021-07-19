import React from "react";
import parser from '../../utils/GroStatsParser';
import tvl from '../../data/tvl';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const rows = [
    parser(tvl, 'tvl_pwrd', 'pwrd'),
    parser(tvl, 'tvl_gvt', 'gvt'),
    parser(tvl, 'tvl_total', 'total'),

];

const amount = (value: any) => {
    return (value === 'NA')
        ? 'NA'
        : <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />
};

export default function BasicTable() {
    const classes = useStyles();


    const tvl_total = parser(tvl, 'tvl_total', 'total');
    console.log(tvl_total);

    return (
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
                            <TableCell component="th" scope="row"> {row.kpi}</TableCell>
                            <TableCell align="right">{amount(row.now)}</TableCell>
                            <TableCell align="right">{amount(row._5m)}</TableCell>
                            <TableCell align="right">{amount(row._5m_dif)}</TableCell>
                            <TableCell align="right">{amount(row._1h)}</TableCell>
                            <TableCell align="right">{amount(row._1h_dif)}</TableCell>
                            <TableCell align="right">{amount(row._1d)}</TableCell>
                            <TableCell align="right">{amount(row._1d_dif)}</TableCell>
                            <TableCell align="right">{amount(row._1w)}</TableCell>
                            <TableCell align="right">{amount(row._1w_dif)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}