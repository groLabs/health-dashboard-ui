import React from "react";
import parser from '../../utils/parsePriceCheck';
// import tvl from '../../data/tvl';
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
        console.log('price check:', priceCheck);
        let tempRows = [];
        for (const item of priceCheck.detail) {
            tempRows.push(parser(item));
        }
        // console.log(tempRows);
        setRows(tempRows);
    }, [priceCheck]);

    return (
        <div className={styles.table}>
            <div className={styles.title}> Price Check </div>
            <div className={styles.price_check_container}>
                <div>
                    <span className={styles.price_check_left_item}> safety check:</span>
                    <span>{boolFormat(priceCheck.global.safety_check)} </span>
                </div>
                <div>
                    <span className={styles.price_check_left_item}> safety check bound:</span>
                    <span>{priceCheck.global.safety_check_bound} </span>
                </div>
                <div>
                    <span className={styles.price_check_left_item}> block number:</span>
                    <span>{priceCheck.global.block_number} </span>
                </div>

            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {showHeaders()}
                        </TableRow>
                    </TableHead>
                    {/* {(rows.length > 0)
                        ? <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={row.key} style={index % 2 ? { background: "#EBECF0" } : { background: "white" }}>
                                    {showRows(row)}
                                </TableRow>
                            ))}
                        </TableBody>
                        : <TableBody>   
                        </TableBody>
                    } */}
                    {/* <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.key} style={index % 2 ? { background: "#EBECF0" } : { background: "white" }}>
                                {showRows(row)}
                            </TableRow>
                        ))}
                    </TableBody> */}
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
