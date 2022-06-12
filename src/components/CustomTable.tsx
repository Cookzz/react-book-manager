import React, {
  useState,
  useEffect,
  MouseEvent,
  ChangeEvent
} from 'react';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import AddIcon from '@mui/icons-material/Add'
import { visuallyHidden } from '@mui/utils';

import { Book } from '../reducers/bookSlice'

import { isObject } from '../utils/FormatUtils';

import './CustomTable.css'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

const getComparator = <Key extends keyof any>(order: Order, orderBy: Key): ((
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface Column {
  disablePadding: boolean;
  id: keyof Book;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  columns: Array<Column>,
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Book) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { 
    columns,
    onSelectAllClick, 
    order, 
    orderBy, 
    numSelected, 
    rowCount, 
    onRequestSort 
  } = props;

  const createSortHandler = (property: keyof Book) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {columns.map((column: Column) => (
          <TableCell
            key={column.id}
            align={column.numeric ? 'right' : 'left'}
            padding={column.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
              {orderBy === column.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  title: string;
  onSearch: any;
  handleOnDeletePress: any
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { title, numSelected, onSearch } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      {(numSelected > 0 && props?.handleOnDeletePress) ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon onClick={props.handleOnDeletePress} />
          </IconButton>
        </Tooltip>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="search" label="Search" variant="standard" onChange={onSearch} />
        </Box>
      )}
    </Toolbar>
  );
};

const CustomTable = (props:any) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Book>('title');
  const [selected, setSelected] = useState<readonly any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])
  const [data, setData]: any = useState([])

  useEffect(()=>{
    setRows(props.rows)
    setColumns(props.columns)
    setData(props.data)
  }, [props.rows, props.columns, props.data])

  useEffect(()=>{
    const sortedData = stableSort(props.data, getComparator(order, orderBy))
    const newData = [...sortedData]
    setData(newData)
  }, [props.data, order])

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof Book) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n: any, index: any) => index);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: MouseEvent<unknown>, index: any) => {
    const selectedIndex = selected.indexOf(index);
    let newSelected: readonly any[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>, rowData: any) => {
    const searchInput = event.target.value;

    if (searchInput !== ''){
      const searchResults = rowData.filter((row: any)=>{
        return Object.values(row)
                      .some((value: any) => {
                        const newValue = isObject(value) ? value.label : (value || "")

                        return (newValue.toString().toLowerCase()).includes(searchInput.toLowerCase())
                      })
      })
      const dataResults = data.filter((row: any)=>{
        return Object.values(row)
                      .some((value: any) => {
                        const newValue = isObject(value) ? value.label : (value || "")

                        return (newValue.toString().toLowerCase()).includes(searchInput.toLowerCase())
                      })
      })
  
      setRows(searchResults)
      setData(dataResults)
    } else {
      setRows(props.rows)
      setData(props.data)
    }
  }

  const handleOnRowClicked = (rowData: any) => {
    //only go to update page if user is allowed to
    if (props?.handleRowClicked){
      props.handleRowClicked(rowData)
    }
  }

  const isSelected = (index: any) => selected.indexOf(index) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      {props?.handleOnAdd &&
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            className="addBtn" 
            size='large' 
            sx={{justifyContent: 'flex-end'}} 
            variant="text" 
            startIcon={<AddIcon />}
            onClick={props.handleOnAdd}
          >
            Add New
          </Button>
        </Box>
      }
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar 
          handleOnDeletePress={props.onDeletePressed}
          title={props.title}
          numSelected={selected.length} 
          onSearch={(event: any)=>handleSearchInput(event, rows)} 
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              columns={columns}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(index);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const subLabelId = `enhanced-table-field-${index}`;
                  const fixedWidth = (95/(Object.keys(columns).length))

                  return (
                    <TableRow
                      hover
                      onClick={(event: any) => {
                        if (event.target.name !== "delete_checkbox"){
                          handleOnRowClicked(data[index])
                        }
                      }}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`row_${index}`}
                      selected={isItemSelected}
                    >
                      <TableCell key={`${labelId}_container`} style={{width:"5%"}} role={"checkbox"} padding="checkbox">
                        <Checkbox
                          name={"delete_checkbox"}
                          sx={{zIndex: 2}}
                          key={labelId}
                          color="primary"
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, index)}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      {Object.values(row).map((value: any, i)=>{
                        if (i === 0){
                          return (
                            <TableCell
                              style={{width: `${fixedWidth}%`}}
                              component="th"
                              key={`${subLabelId}_${i}`}
                              id={`${subLabelId}_${i}`}
                              scope="row"
                              padding="none"
                            >
                              {(value?.label || value || "")}
                            </TableCell>
                          )
                        }

                        return (
                          <TableCell 
                            key={`${subLabelId}_${i}`} style={{width: `${fixedWidth}%`}} align="left"
                          >
                            {(value?.label || value || "")}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default CustomTable;