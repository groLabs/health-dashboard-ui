import React from "react";
import parser from '../../utils/parseGroStats';
// import strategies from '../../data/strategies';
import styles from './Dashboard.module.css';
import { showHeaders, showRows } from './headers/groStats';
import { IStrategy } from "../../interfaces/groStats";
import { useTypedSelector } from '../../store/reducers/reducer';
// styles
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
