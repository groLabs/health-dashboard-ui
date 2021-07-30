import React from "react";
import parser from '../../utils/parseGroStats';
// import tvl from '../../data/tvl';
import styles from './Dashboard.module.css';
import { showHeaders, showRows } from './Kpis';
import { useTypedSelector } from '../../store/reducers/reducer';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IDefault } from "../../interfaces/Dashboard";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const PriceCheck = () => {
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
            <div className={styles.title}> Price Check </div>
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

export default PriceCheck;
