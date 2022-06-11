import React, {
  useEffect,
  useState,
  useMemo
} from 'react';

import CustomTable from '../components/CustomTable';

import { createRowData, createColumnData } from '../utils/FormatUtils';

import { useAppDispatch, useAppSelector } from '../redux/hooks';

import { selectBookList } from '../reducers/bookSlice';
import { selectUser } from '../reducers/userSlice';

import './BookManager.css'

const BookManager = (props:any): JSX.Element => {
  const bookList = useAppSelector(selectBookList)
  const user = useAppSelector(selectUser)

  const rows = useMemo(() => createRowData(bookList, ["id"]), [bookList])
  
  const columns = useMemo(() => createColumnData(bookList, ["id"]), [bookList])

  return (
    <>
      <main className="container">
        <h2>Welcome to the Book Manager, {user.name}!</h2>
        <CustomTable 
          title={'Books'}
          rows={rows} 
          columns={columns}
          data={bookList}
        />
      </main>
    </>
  );
}

export default BookManager;