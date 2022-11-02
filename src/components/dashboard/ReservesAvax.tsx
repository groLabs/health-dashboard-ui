import React from 'react';
import parser from '../../utils/parseGroStats';
import styles from './Dashboard.module.css';
import { IReserve } from '../../interfaces/groStats';
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

const ReservesAvax = () => {
    const classes = useStyles();
    const reservesAvax = useTypedSelector(state => state.groStats.reserves_avax);
    const [rows, setRows] = React.useState<IReserve[]>([]);

    React.useEffect(() => {
        const tempRows = [];
        if (reservesAvax.length > 0) {
            for (const item of reservesAvax) {
                tempRows.push(
                    parser(item, 'amount', 'amount', 'amount'),
                    parser(item, 'share', 'share', 'percentage'),
                    parser(item, 'last3d_apy', 'last3d apy', 'percentage'),
                );
            }
            setRows(tempRows);
        }
    }, [reservesAvax]);

    return (
        <div className={styles.table}>
            <div className={styles.title}> Reserves </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:'bold', color: '#651C9C'}}>Vault</TableCell>
                            <TableCell style={{fontWeight:'bold', color: '#651C9C'}}>Reserve</TableCell>
                            <TableCell style={{fontWeight:'bold', color: '#651C9C'}}>KPI</TableCell>
                            {showHeaders()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.key} style ={ index % 2? { background : "#EBECF0" }:{ background : "white" }}>
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

export default ReservesAvax;
