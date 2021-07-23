import React from "react";
import parser from '../../utils/parseGroStats';
// import vaults from '../../data/vaults';
import styles from './Dashboard.module.css';
import { showHeaders, showRows } from './Kpis';
import { IVault } from "../../interfaces/Dashboard";
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

const Vaults = () => {
    const classes = useStyles();
    const vaults = useTypedSelector(state => state.groStats.vaults);
    const [rows, setRows] = React.useState<IVault[]>([]);

    React.useEffect(() => {
        const tempRows = [];
        for (const item of vaults) {
            tempRows.push(
                parser(item, 'amount', 'amount', 'amount'),
                parser(item, 'share', 'share', 'percentage'),
                parser(item, 'last3d_apy', 'last3d_apy', 'percentage'),
            );
        }
        setRows(tempRows);
    }, [vaults]);

    return (
        <div className={styles.table}>
            <div className={styles.title}> Vaults </div>
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
                        {rows.map((row, index) => (
                            <TableRow key={row.key} style ={ index % 2? { background : "#EBECF0" }:{ background : "white" }}>
                                <TableCell component="td" scope="row"> {row.vault_name}</TableCell>
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

export default Vaults;
