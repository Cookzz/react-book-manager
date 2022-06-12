import React, {
  useEffect,
  useState,
  useMemo
} from 'react';
import { useNavigate } from "react-router-dom";

import CustomTable from '../components/CustomTable';

import { createRowData, createColumnData } from '../utils/FormatUtils';

import { useAppDispatch, useAppSelector } from '../redux/hooks';

import { selectBookList, Book } from '../reducers/bookSlice';
import { selectUser } from '../reducers/userSlice';

import './BookManager.css'

const BookManager = (props:any): JSX.Element => {
  const bookList = useAppSelector(selectBookList)
  const user = useAppSelector(selectUser)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  const rows = useMemo(() => createRowData(bookList, ["id"]), [bookList])
  const columns = useMemo(() => createColumnData(bookList, ["id"]), [bookList])

  const onAddBook = () => {
    navigate('/books/create')
  }

  const onEditBook = (book: Book) => {
    navigate(`/books/update/${book.id}`)
  }

  const onDeleteBook = (deleteBookList: any) => {
    
  }

  // useEffect(()=>{
  //   dispatch(clear())
  // }, [])

  return (
    <>
      <main className="container">
        <h2>Welcome to the Book Manager, {user.name}!</h2>
        <CustomTable 
          title={'Books'}
          rows={rows} 
          columns={columns}
          data={bookList}
          handleOnAdd={(user.user_type !== 'Guest' ? onAddBook : null)}
          handleRowClicked={(user.user_type !== 'Guest' ? onEditBook : null)}
          onDeletePressed={(user.user_type !== 'Guest' ? onDeleteBook : null)}
        />
      </main>
    </>
  );
}

export default BookManager;