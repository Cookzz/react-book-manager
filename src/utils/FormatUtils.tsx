import { Book } from "../reducers/bookSlice";

export const createColumnData = (data: Array<Book>) => {
  if (data.length == 0){
    return []
  }

  const rowData = data[0];

  const dataColumns = Object.keys(rowData).map((key, i)=>({
    id: key,
    label: (key.replace(/_/g, ' ')).toUpperCase(),
    disablePadding: (i === 0),
    numeric: false
  }))

  const extraColumns = [{
    id: "update",
    label: "Update".toUpperCase(),
    disablePadding: false,
    numeric: false
  }]

  const columns = [...dataColumns, ...extraColumns]

  return columns;
}