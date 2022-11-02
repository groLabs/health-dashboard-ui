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

const LifeguardStables = () => {
    const classes = useStyles();
    const stables = useTypedSelector(state => state.groStats.lifeguardStables);
    const [rows, setRows] = React.useState<IDefault[]>([]); // TODO: define interface

    React.useEffect(() => {
        let tempRows = [];
        if (stables.length > 0) {
            for (const item of stables) {
                tempRows.push(
                    parser(item, 'amount', 'amount', 'amount'),
                );
            }
            setRows(tempRows);
        }
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
