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

const LifeguardStables = () => {
    const classes = useStyles();
    const stables = useTypedSelector(state => state.groStats.lifeguardStables);
    const [rows, setRows] = React.useState<IDefault[]>([]); // TODO: define interface

    React.useEffect(() => {
        let tempRows = [];
        for (const item of stables) {
            console.log(item);
            tempRows.push(
                parser(item, 'amount', 'amount', 'amount'),
            );
        }
        setRows(tempRows);
    }, [stables]);

    return (
        <div className={styles.table}>
            <div className={styles.title}> Lifeguard stables </div>
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
                                <TableCell component="td" scope="row"> {row.name}</TableCell>
                                {showRows(row)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default LifeguardStables;
