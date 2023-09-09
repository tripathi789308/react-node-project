import React, { useState, useMemo, useEffect } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import {
  TextField,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Button,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const TableComponent = ({
  data,
  onEdit,
  onDelete,
  loading,
  setLoading,
  openCreateModal,
  setOpenCreateModal,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "Customer ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Mobile",
        accessor: "mobile",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onEdit(row.original)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                onDelete(row.original);
              }}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    console.log("Table Updated", data);
  }, [data]);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    state,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setGlobalFilter,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: rowsPerPage }, // You can set initial page index here
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  return (
    <div>
      <TextField
        variant="outlined"
        label="Search"
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
      />
      <Button
        variant="outlined"
        sx={{ left: "10px", top: "10px" }}
        onClick={() => setOpenCreateModal(true)}
      >
        Create Customer
      </Button>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table {...getTableProps()} aria-label="Table">
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <TableCell {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={pageIndex}
        onPageChange={(e, newPage) => {
          newPage > pageIndex ? nextPage(newPage) : previousPage(newPage);
        }}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(e.target.value);
        }}
      />
    </div>
  );
};

export default TableComponent;
