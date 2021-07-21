import React from "react";
import parser from '../../utils/GroStatsParser';
// import system from '../../data/system';
import lifeguard from '../../data/lifeguard';
import styles from './Dashboard.module.css';
import { showHeaders, showRows } from './Kpis';
import { IDefault } from "../../interfaces/Dashboard";
import { useTypedSelector } from '../../store/reducers/reducer';

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

const System = () => {
    const classes = useStyles();
    const system = useTypedSelector(state => state.groStats.system);
    const [rows, setRows] = React.useState<IDefault[]>([]);

    React.useEffect(() => {
        const tempRows = [
            parser(system, 'total_amount', 'system - amount', 'amount'),
            parser(system, 'total_share', 'system - share', 'percentage'),
            parser(system, 'last3d_apy', 'system - last 3d APY', 'percentage'),
            parser(lifeguard, 'amount', 'lifeguard - amount', 'amount'),
            parser(lifeguard, 'share', 'lifeguard - share', 'percentage'),
            parser(lifeguard, 'last3d_apy', 'lifeguard - last 3d APY', 'percentage'),
        ];
        setRows(tempRows);
    }, [system]);

    return (
        <div className={styles.table}>
            <div className={styles.title}> System </div>
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

export default System;
