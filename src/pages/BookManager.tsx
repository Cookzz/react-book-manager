import React, {
  useEffect,
  useState,
  useMemo
} from 'react';

import CustomTable from '../components/CustomTable';

import { createColumnData } from '../utils/FormatUtils';

import { useAppDispatch, useAppSelector } from '../redux/hooks';

import { selectBookList } from '../reducers/bookSlice';

import './BookManager.css'

const BookManager = (props:any): JSX.Element => {
  const dispatch = useAppDispatch()
  const bookList = useAppSelector(selectBookList)

  const data = useMemo(() => bookList, [bookList])
  
  const columns = useMemo(() => createColumnData(bookList), [bookList])

  return (
    <>
      <main className="container">
        <h2>Welcome to the Book Manager!</h2>
        <CustomTable rows={data} columns={columns} />
      </main>
    </>
  );
}

export default BookManager;