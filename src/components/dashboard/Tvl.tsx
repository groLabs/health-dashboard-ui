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

const Tvl = () => {
    const classes = useStyles();
    const tvl = useTypedSelector(state => state.groStats.tvl);
    const [rows, setRows] = React.useState<IDefault[]>([]);

    React.useEffect(() => {
        const tempRows = [
            parser(tvl, 'tvl_pwrd', 'pwrd', 'amount'),
            parser(tvl, 'tvl_gvt', 'gvt', 'amount'),
            parser(tvl, 'tvl_total', 'total', 'amount'),
            parser(tvl, 'util_ratio_limit_pwrd', 'util ratio limit pwrd', 'percentage'),
            parser(tvl, 'util_ratio_limit_gvt', 'util ratio limit gvt', 'percentage'),
            parser(tvl, 'util_ratio', 'util ratio total', 'percentage'),
        ];
        setRows(tempRows);
    }, [tvl]);

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

export default Tvl;
