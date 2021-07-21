import React from "react";
import parser from '../../utils/parseGroStats';
// import protocols from '../../data/protocols';
import styles from './Dashboard.module.css';
import { showHeaders, showRows } from './Kpis';
import { IExposure } from "../../interfaces/Dashboard";
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

const ExposureProtocols = () => {
    const classes = useStyles();
    const protocols = useTypedSelector(state => state.groStats.exposureProtocols);
    const [rows, setRows] = React.useState<IExposure[]>([]);

    React.useEffect(() => {
        const tempRows = [];
        console.log('protocols', protocols)
        for (const item of protocols) {
            tempRows.push(
                parser(item, 'concentration', 'concentration', 'percentage'),
            );
        }
        setRows(tempRows);
    }, [protocols]);

    return (
        <div className={styles.table}>
            <div className={styles.title}> Exposure Protocols </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>KPI</TableCell>
                            {showHeaders()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.key}>
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

export default ExposureProtocols;
