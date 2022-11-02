import React from 'react';
import parser from '../../utils/parseGroStats';
import styles from './Dashboard.module.css';
import { IExposure } from '../../interfaces/groStats';
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

const ExposureStables = () => {
    const classes = useStyles();
    const stables = useTypedSelector(state => state.groStats.exposureStables);
    const [rows, setRows] = React.useState<IExposure[]>([]);

    React.useEffect(() => {
        const tempRows = [];
        if (stables.length > 0) {
            for (const item of stables) {
                tempRows.push(
                    parser(item, 'concentration', 'concentration', 'percentage'),
                );
            }
            setRows(tempRows);
        }
    }, [stables]);

    return (
        <div className={styles.table}>
            <div className={styles.title}> Exposure Stablecoins </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:'bold', color: '#651C9C'}}>Stablecoin</TableCell>
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

export default ExposureStables;
