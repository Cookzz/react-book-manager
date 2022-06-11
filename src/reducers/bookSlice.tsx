import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import { BOOKS } from '../constants/AppConstants'

export interface Book {
  id: number;
  title: string;
  subtitle: string;
  genre: string;
  author: string;
  publisher: string;
  published_year: number;
  owner: any;
}

export interface BooksState {
  bookList: Array<Book>
}

const initialState: BooksState = {
  bookList: BOOKS,
}

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    add: (state: BooksState, action: PayloadAction<Book>) => {
      state.bookList.push(action.payload)
    },
    remove: (state: BooksState, action: PayloadAction<Array<Book>>) => {
      state.bookList = action.payload
    },
    update: (state: BooksState, action: PayloadAction<any>) => {
      
    }
  },
})

// Action creators are generated for each case reducer function
export const { add, remove, update } = bookSlice.actions

export const removeBook = (bookObj: any) => (dispatch: any, getState: any) => {
  const { books: { bookList } } = getState()

  console.log("got book", bookList)
}

export const selectBookList = (state: RootState): Array<Book> => state.books.bookList

export default bookSlice.reducer