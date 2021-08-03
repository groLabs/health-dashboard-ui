import React from "react";
import parser from '../../utils/parseGroStats';
import styles from './Dashboard.module.css';
import { showHeaders, showRows } from './headers/groStats';
import { IDefault } from "../../interfaces/groStats";
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

const Apy = () => {
    const classes = useStyles();
    const apy1 = useTypedSelector(state => state.groStats.apy1);
    const apy2 = useTypedSelector(state => state.groStats.apy2);
    const system = useTypedSelector(state => state.groStats.system);
    const [rows, setRows] = React.useState<IDefault[]>([]);

    React.useEffect(() => {
        const tempRows = [
            parser(apy1, 'apy_last24h', 'last 24h - pwrd', 'percentage'),
            parser(apy2, 'apy_last24h', 'last 24h - gvt', 'percentage'),
            parser(apy1, 'apy_last7d', 'last 7d - pwrd', 'percentage'),
            parser(apy2, 'apy_last7d', 'last 7d - gvt', 'percentage'),
            parser(apy1, 'apy_daily', 'daily - pwrd', 'percentage'),
            parser(apy2, 'apy_daily', 'daily - gvt', 'percentage'),
            parser(apy1, 'apy_weekly', 'weekly - pwrd', 'percentage'),
            parser(apy2, 'apy_weekly', 'weekly - gvt', 'percentage'),
            parser(apy1, 'apy_monthly', 'monthly - pwrd', 'percentage'),
            parser(apy2, 'apy_monthly', 'monthly - gvt', 'percentage'),
            parser(apy1, 'apy_all_time', 'all time - pwrd', 'percentage'),
            parser(apy2, 'apy_all_time', 'all time - gvt', 'percentage'),
            parser(apy1, 'apy_current', 'current - pwrd', 'percentage'),
            parser(apy2, 'apy_current', 'current - gvt', 'percentage'),
            parser(system, 'hodl_bonus', 'HODL bonus', 'percentage'),
        ];
        setRows(tempRows);
    }, [apy1, apy2, system]);

    return (
        <div className={styles.table}>
            <div className={styles.title}> APY </div>
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
                                <TableCell component="th" scope="row">{row.kpi}</TableCell>
                                {showRows(row)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}

export default Apy;
