import React from 'react';
import styles from './Dashboard.module.css';
import parser from '../../utils/parseGroStats';
import { IDefault } from '../../interfaces/groStats';
import { useTypedSelector } from '../../store/reducers/reducer';
import {
    showRows,
    showHeaders,
} from './headers/groStats';
// styles
import { makeStyles } from '@mui/styles';
import {
    Paper,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
} from '@mui/material';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const System = () => {
    const classes = useStyles();
    const system = useTypedSelector(state => state.groStats.system);
    const lifeguard = useTypedSelector(state => state.groStats.lifeguard);
    const [rows, setRows] = React.useState<IDefault[]>([]);

    React.useEffect(() => {
        const tempRows = [
            parser(system, 'total_amount', 'system - amount', 'amount'),
            parser(system, 'total_share', 'system - share', 'percentage'),
            parser(system, 'last3d_apy', 'system - last 3d APY', 'percentage'),
            // parser(lifeguard, 'amount', 'lifeguard - amount', 'amount'),
            // parser(lifeguard, 'share', 'lifeguard - share', 'percentage'),
            // parser(lifeguard, 'last3d_apy', 'lifeguard - last 3d APY', 'percentage'),
        ];
        setRows(tempRows);
    }, [system, lifeguard]);

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
                        {rows.map((row, index) => (
                            <TableRow key={row.key} style ={ index % 2? { background : "#EBECF0" }:{ background : "white" }}>
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
