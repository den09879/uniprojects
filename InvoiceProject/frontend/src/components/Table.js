import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Pdf from './invoice_render.pdf';

import MUIDataTable from "mui-datatables";

function createData(name, file) {
  return { name, file};
}

const columns = [
  {
   name: "name",
   label: "Invoice Name",
   options: {
    filter: true,
    sort: true,
    setCellProps: () => ({ style: { minWidth: "800px", maxWidth: "800px" }}),
   }
  },
  {
   name: "company",
   label: "File Type",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
        name: "View",
        options: {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <button onClick={() => {
                const { data } = this.state;
                data.shift();
                this.setState({ data });
              }}>
                View
              </button>
            );
          }
        }
      },
 ];
 
 const data = [
  { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
  { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
  { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
  { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
 ];
 
 const options = {
   filterType: 'checkbox',
 };
 /*
const rows = [
  createData('Stationary Warehouse 24/5/2018', 'pdf'),
  createData('Monthly Sales 31/5/2018', 'pdf'),
  createData('Stationary Warehouse 7/6/2018', 'pdf'),
  createData('Stationary Warehouse 21/6/2018', 'pdf'),
  createData('Monthly Sales 30/6/2018', 'pdf'),
];
*/
export default function BasicTable() {

  return (
      <MUIDataTable
    title={"Invoice List"}
    data={data}
    columns={columns}
    options={options}
  />
  );
}

