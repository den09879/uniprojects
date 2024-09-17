import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, quantity, price) {
  return { name, quantity, price};
}

const rows = [
  createData('Pencils', '500', '$100'),
  createData('Erasers', '450', '$150'),
  createData('Calculators', '200', '$450'),
  createData('Pens', '600', '$200'),
  createData('Paper', '450', '$300'),
];

export default function BasicTable() {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="simple table">
        <TableHead>
          <TableRow 
            sx={{
              backgroundColor: '#EEEFF0',
              "& th": {
                fontSize: "1.25rem",
                color: '#000000'
              }
            }}>
            <TableCell >Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{ maxWidth:  700}}> {row.name}</TableCell>
              <TableCell align="right" style={{ minWidth:  200}}>{row.quantity}</TableCell>
              <TableCell align="right" style={{ maxWidth:  100}}> {row.price} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}