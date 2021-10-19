import React from "react";
import parser from '../../utils/parsePriceCheck';
import styles from './Dashboard.module.css';
import { showHeaders, showRows } from './headers/priceCheck';
import { useTypedSelector } from '../../store/reducers/reducer';
import boolFormat from '../../utils/boolFormat';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IPriceCheck } from "../../interfaces/priceCheck";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const PriceCheck = () => {
    const classes = useStyles();
    const priceCheck = useTypedSelector(state => state.priceCheck);
    const [rows, setRows] = React.useState<IPriceCheck[]>([]);

    React.useEffect(() => {
        let tempRows = [];
        for (const item of priceCheck.detail) {
            tempRows.push(parser(item));
        }
        setRows(tempRows);
    }, [priceCheck]);

    return (
        <div className={styles.table}>
            <div className={styles.title}> Price Check </div>
            <div className={styles.price_check_container}>
                <div>
                    <span className={styles.price_check_left_item}> Safety check:</span>
                    <span>{(priceCheck.global)
                        ? boolFormat(priceCheck.global.safety_check)
                        : null}
                    </span>
                </div>
                <div>
                    <span className={styles.price_check_left_item}> Oracle check tolerance:</span>
                    <span>{(priceCheck.global)
                        ? priceCheck.global.oracle_check_tolerance
                        : null} </span>
                </div>
                <div>
                    <span className={styles.price_check_left_item}> Curve check tolerance:</span>
                    <span>{(priceCheck.global)
                        ? priceCheck.global.curve_check_tolerance
                        : null} </span>
                </div>
                <div className={styles.bottomMargin15px}>
                    <span className={styles.price_check_left_item}> Block number:</span>
                    <span>{(priceCheck.global)
                        ? priceCheck.global.block_number
                        : null} </span>
                </div>

            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', color: '#651C9C' }}>Pair</TableCell>
                            {showHeaders()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rows.length > 0)
                            ? rows.map((row, index) => (
                                <TableRow key={row.key} style={index % 2 ? { background: "#EBECF0" } : { background: "white" }}>
                                    {showRows(row)}
                                </TableRow>

                            ))
                            : null
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default PriceCheck;
