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

const TvlAvax = () => {
    const classes = useStyles();
    const tvlAvax = useTypedSelector(state => state.groStats.tvl_avax);
    const [rows, setRows] = React.useState<IDefault[]>([]);

    React.useEffect(() => {
        const tempRows = [
            parser(tvlAvax, 'labs_dai_vault', 'labs_dai_vault', 'amount'),
            parser(tvlAvax, 'labs_usdc_vault', 'labs_usdc_vault', 'amount'),
            parser(tvlAvax, 'labs_usdt_vault', 'labs_usdt_vault', 'amount'),
            parser(tvlAvax, 'labs_dai_vault_1_5', 'labs_dai_vault_1_5', 'amount'),
            parser(tvlAvax, 'labs_usdc_vault_1_5', 'labs_usdc_vault_1_5', 'amount'),
            parser(tvlAvax, 'labs_usdt_vault_1_5', 'labs_usdt_vault_1_5', 'amount'),
            parser(tvlAvax, 'labs_dai_vault_1_6', 'labs_dai_vault_1_6', 'amount'),
            parser(tvlAvax, 'labs_usdc_vault_1_6', 'labs_usdc_vault_1_6', 'amount'),
            parser(tvlAvax, 'labs_usdt_vault_1_6', 'labs_usdt_vault_1_6', 'amount'),
            parser(tvlAvax, 'labs_dai_vault_1_7', 'labs_dai_vault_1_7', 'amount'),
            parser(tvlAvax, 'labs_usdc_vault_1_7', 'labs_usdc_vault_1_7', 'amount'),
            parser(tvlAvax, 'labs_usdt_vault_1_7', 'labs_usdt_vault_1_7', 'amount'),
            parser(tvlAvax, 'total', 'total', 'amount'),
        ];
        setRows(tempRows);
    }, [tvlAvax]);

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

export default TvlAvax;
