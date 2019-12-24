import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Data from './getdata';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

function createData(name, time, heartRate, location, condition) {
  return {name, time, heartRate, location, condition};
}

const rows = [
  createData('User 1', null, null, null, null),
  createData('User 2', null, null, null, null),
  createData('User 3', null, null, null, null),
  createData('User 4', null, null, null, null),
  createData('User 5', null, null, null, null),
];

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Heart Rate</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Condition</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.heartRate}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">{row.condition}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
