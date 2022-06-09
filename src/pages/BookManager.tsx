import React, {
  useEffect,
  useState
} from 'react';

import Table from '../components/Table';

import { useAppDispatch, useAppSelector } from '../redux/hooks';

import { selectBookList } from '../reducers/bookSlice';

import './BookManager.css'

const BookManager = (props:any): JSX.Element => {
  const dispatch = useAppDispatch()
  const bookList = useAppSelector(selectBookList)

  const data = React.useMemo(() => [
    {
      col1: 'Hello',
      col2: 'World',
    },
    {
      col1: 'react-table',
      col2: 'rocks',
    },
    {
      col1: 'whatever',
      col2: 'you want',
    },
  ], [])
  
  const columns = React.useMemo(() => [
    {
      Header: 'Column 1',
      accessor: 'col1', // accessor is the "key" in the data
    },
    {
      Header: 'Column 2',
      accessor: 'col2',
    },
  ], [])

  return (
    <>
      <main className="container">
        <h2>Welcome to the Book Manager!</h2>
        <Table columns={columns} data={data} />
      </main>
    </>
  );
}

export default BookManager;