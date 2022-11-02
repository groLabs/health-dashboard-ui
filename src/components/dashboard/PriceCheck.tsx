import React from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import styles from './Dashboard.module.css';
import boolFormat from '../../utils/boolFormat';
import parser from '../../utils/parsePriceCheck';
import getNetworkId from '../../utils/getNetworkId';
import { IPriceCheck } from '../../interfaces/priceCheck';
import { useTypedSelector } from '../../store/reducers/reducer';
import {
    showRows,
    showHeaders,
} from './headers/priceCheck';
import {
    APP_STATS_BOT_URL,
    APP_STATS_BOT_PORT,
    APP_NETWORK_ID,
    APP_ELEVATED_FUNCTIONS,
} from '../../constants';
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

const URL = `${APP_STATS_BOT_URL}:${APP_STATS_BOT_PORT}/database/table_dump`;
const networkId = APP_NETWORK_ID || 0;


const PriceCheck = () => {
    const classes = useStyles();
    const priceCheck = useTypedSelector(state => state.priceCheck);
    const [rows, setRows] = React.useState<IPriceCheck[]>([]);
    const [file, setFile] = React.useState<any>('');
    const [isGeneratingFile, setIsGeneratingFile] = React.useState<boolean>(false);
    const [isErrorGeneratingFile, setIsErrorGeneratingFile] = React.useState<String>('');

    React.useEffect(() => {
        let tempRows = [];
        for (const item of priceCheck.detail) {
            tempRows.push(parser(item));
        }
        setRows(tempRows);
    }, [priceCheck]);

    const fetchAPI = async () => {
        setIsGeneratingFile(true);
        await axios.get(URL, {
            params: {
                network: getNetworkId(networkId),
                table: 'PROTOCOL_PRICE_CHECK_DETAILED'
            },
        }).then(res => {
            setIsErrorGeneratingFile('');
            setFile(res.data);
        }).catch(err => {
            setIsErrorGeneratingFile(`${err}`);
        });
        setIsGeneratingFile(false);
    }

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
                        : null}
                    </span>
                </div>
                <div>
                    <span className={styles.price_check_left_item}> Curve check tolerance:</span>
                    <span>{(priceCheck.global)
                        ? priceCheck.global.curve_check_tolerance
                        : null}
                    </span>
                </div>
                <div className={styles.bottomMargin15px}>
                    <span className={styles.price_check_left_item}> Block number:</span>
                    <span>{(priceCheck.global)
                        ? priceCheck.global.block_number
                        : null}
                    </span>
                </div>
                <div>
                    {(APP_ELEVATED_FUNCTIONS === 'yes')
                        ?
                        <div>
                            <span className={styles.marginSides10px}>
                                <button
                                    onClick={async () => await fetchAPI()}
                                    disabled={isGeneratingFile}
                                >
                                    {(isGeneratingFile)
                                        ? 'Creating CSV'
                                        : 'Export to CSV'
                                    }
                                </button>
                            </span>
                            <span>                    {
                                (file.length > 0)
                                    ?
                                    <CSVLink
                                        data={file}
                                        filename={"pricecheck.csv"}>
                                        Download file
                                    </CSVLink>
                                    : ''
                            }
                            </span>
                            <span>
                                {isErrorGeneratingFile}
                            </span>
                        </div>
                        : ''
                    }
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
        </div >
    );
}

export default PriceCheck;
