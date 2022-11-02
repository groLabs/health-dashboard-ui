import React from 'react';
import parser from '../../utils/parseGroStats';
// import strategies from '../../data/strategies';
import styles from './Dashboard.module.css';
import { IStrategy } from '../../interfaces/groStats';
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

const Strategies = () => {
    const classes = useStyles();
    const strategies = useTypedSelector(state => state.groStats.strategies);
    const [rows, setRows] = React.useState<IStrategy[]>([]);

    React.useEffect(() => {
        const tempRows = [];
        if (strategies.length > 0) {
            for (const item of strategies) {
                tempRows.push(
                    parser(item, 'amount', 'amount', 'amount'),
                    parser(item, 'share', 'share', 'percentage'),
                    parser(item, 'last3d_apy', 'last3d_apy', 'percentage'),
                );
            }
            setRows(tempRows);
        }
    }, [strategies]);

    return (
        <div className={styles.table}>
            <div className={styles.title}> Strategies </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:'bold', color: '#651C9C'}}>Vault</TableCell>
                            <TableCell style={{fontWeight:'bold', color: '#651C9C'}}>Strategy</TableCell>
                            <TableCell style={{fontWeight:'bold', color: '#651C9C'}}>KPI</TableCell>
                            {showHeaders()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.key} style ={ index % 2? { background : "#EBECF0" }:{ background : "white" }}>
                                <TableCell component="td" scope="row"> {row.vault_name}</TableCell>
                                <TableCell component="td" scope="row"> {row.strategy_name}</TableCell>
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

export default Strategies;
