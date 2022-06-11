export const createColumnData = (data: Array<Object>, filterList: Array<string> = []) => {
  if (data.length === 0){
    return []
  }

  const rowData = data[0];

  let columns = Object.keys(rowData).map((key, i)=>({
    id: key,
    label: (key.replace(/_/g, ' ')).toUpperCase(),
    disablePadding: (i === 0),
    numeric: false
  }))

  if (filterList.length > 0){
    columns = columns.filter((column: any) => !filterList.includes(column.id))
  }

  return columns;
}

export const createRowData = (data: Array<Object>, filterList: Array<string> = []) => {
  if (data.length === 0){
    return []
  }

  let rows = data;

  if (filterList.length > 0){
    rows = data.map((row)=>{
      const newRow = Object.fromEntries(Object.entries(row).filter(([key]) => !filterList.includes(key)));

      return newRow;
    })
  }

  return rows;
}