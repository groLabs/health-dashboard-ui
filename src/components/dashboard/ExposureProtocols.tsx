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

const ExposureProtocols = () => {
    const classes = useStyles();
    const protocols = useTypedSelector(state => state.groStats.exposureProtocols);
    const [rows, setRows] = React.useState<IExposure[]>([]);

    React.useEffect(() => {
        const tempRows = [];
        if (protocols.length > 0) {
            for (const item of protocols) {
                tempRows.push(
                    parser(item, 'concentration', 'concentration', 'percentage'),
                );
            }
            setRows(tempRows);
        }
    }, [protocols]);

    return (
        <div className={styles.table}>
            <div className={styles.title}> Exposure Protocols </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:'bold', color: '#651C9C'}}>Protocol</TableCell>
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

export default ExposureProtocols;
