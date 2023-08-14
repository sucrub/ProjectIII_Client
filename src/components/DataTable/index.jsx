import React, { useState } from "react";
import {
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TableFooter,
  Pagination,
  Paper,
} from "@mui/material";
import DataTableStyle from "./index.style";

const DataTable = (props) => {
  const { columns, data, numPage, changePage, isShowId } = props;
  const [page, setPage] = useState(1);
  const handlePageChange = (event, page) => {
    console.log(page);
    setPage(page);
    changePage(page);
  };

  return (
    <DataTableStyle className="table" component={Paper}>
      <Table>
        <TableHead>
          {columns.map((column) => (
            <TableCell className="bold-text uppercase">{column}</TableCell>
          ))}
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              {Object.keys(row).map((key) =>
                key !== "id" || isShowId ? (
                  <TableCell>{row[key]}</TableCell>
                ) : null
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableFooter></TableFooter>
      <Pagination
        className="pagination"
        size="large"
        variant="outlined"
        count={numPage}
        color="primary"
        page={page}
        onChange={handlePageChange}
      />
    </DataTableStyle>
  );
};

export default DataTable;
