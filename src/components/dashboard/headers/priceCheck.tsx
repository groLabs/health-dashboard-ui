import React from "react";
import TableCell from '@material-ui/core/TableCell';
import boolFormat from '../../../utils/boolFormat';


export const showHeaders = () => (
    < React.Fragment >
        <TableCell align="right" style={{fontWeight:'bold', color: '#651C9C'}}>Curve</TableCell>
        <TableCell align="right" style={{fontWeight:'bold', color: '#651C9C'}}>Curve Cache</TableCell>
        <TableCell align="right" style={{fontWeight:'bold', color: '#651C9C'}}>Δ Curve Cache BPS</TableCell>
        <TableCell align="right" style={{fontWeight:'bold', color: '#651C9C'}}>✔︎ Curve Cache</TableCell>
        <TableCell align="right" style={{fontWeight:'bold', color: '#651C9C'}}>Chainlink</TableCell>
        <TableCell align="right" style={{fontWeight:'bold', color: '#651C9C'}}>Δ Chainlink BPS</TableCell>
        <TableCell align="right" style={{fontWeight:'bold', color: '#651C9C'}}>✔︎ Chainlink</TableCell>
    </React.Fragment >
);

export const showRows = (row: any) => (
    < React.Fragment >
        <TableCell align="left"> {row.pair}</TableCell>
        <TableCell align="right"> {row.curve_price}</TableCell>
        <TableCell align="right"> {row.curve_cache_price}</TableCell>
        <TableCell align="right"> {row.curve_cache_diff}</TableCell>
        <TableCell align="right"> {boolFormat(row.curve_cache_check)}</TableCell>
        <TableCell align="right"> {row.chainlink_price}</TableCell>
        <TableCell align="right"> {row.curve_chainlink_diff}</TableCell>
        <TableCell align="right"> {boolFormat(row.curve_chainlink_check)}</TableCell>
    </React.Fragment>
);
