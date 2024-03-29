import React from 'react';
import { TableCell } from '@mui/material';
import format from '../../../utils/Format';


export const showHeaders = () => (
    < React.Fragment >
        <TableCell align="right" style={{fontWeight:'bold', color: '#651C9C'}}>Last</TableCell>
        <TableCell align="right" style={{fontWeight:'bold', color: '#651C9C'}}>5m</TableCell>
        <TableCell align="right" style={{fontWeight:'bold', color: '#651C9C'}}>Δ 5m</TableCell>
        <TableCell align="right" style={{fontWeight:'bold', color: '#651C9C'}}>1h</TableCell>
        <TableCell align="right" style={{fontWeight:'bold', color: '#651C9C'}}>Δ 1h</TableCell>
        <TableCell align="right" style={{fontWeight:'bold', color: '#651C9C'}}>1d</TableCell>
        <TableCell align="right" style={{fontWeight:'bold', color: '#651C9C'}}>Δ 1d</TableCell>
        <TableCell align="right" style={{fontWeight:'bold', color: '#651C9C'}}>1w</TableCell>
        <TableCell align="right" style={{fontWeight:'bold', color: '#651C9C'}}>Δ 1w</TableCell>
    </React.Fragment >
);

export const showRows = (row: any) => (
    < React.Fragment >
        <TableCell align="right" style={{fontWeight:'bold'}}>{format(row.now, row.format, false)}</TableCell>
        <TableCell align="right">{format(row._5m, row.format, false)}</TableCell>
        <TableCell align="right" style={{fontWeight:'lighter'}}>{format(row._5m_dif, row.format, true)}</TableCell>
        <TableCell align="right">{format(row._1h, row.format, false)}</TableCell>
        <TableCell align="right" style={{fontWeight:'lighter'}}>{format(row._1h_dif, row.format, true)}</TableCell>
        <TableCell align="right">{format(row._1d, row.format, false)}</TableCell>
        <TableCell align="right" style={{fontWeight:'lighter'}}>{format(row._1d_dif, row.format, true)}</TableCell>
        <TableCell align="right">{format(row._1w, row.format, false)}</TableCell>
        <TableCell align="right" style={{fontWeight:'lighter'}}>{format(row._1w_dif, row.format, true)}</TableCell>
    </React.Fragment>
);
