import React from "react";
import parser from '../../utils/parseGroStats';
import styles from './Dashboard.module.css';
import { showHeaders, showRows } from './headers/groStats';
import { IExposure } from "../../interfaces/groStats";
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

const ExposureStables = () => {
    const classes = useStyles();
    const stables = useTypedSelector(state => state.groStats.exposureStables);
    const [rows, setRows] = React.useState<IExposure[]>([]);

    React.useEffect(() => {
        const tempRows = [];
        for (const item of stables) {
            tempRows.push(
                parser(item, 'concentration', 'concentration', 'percentage'),
            );
        }
        setRows(tempRows);
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
