import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import { BOOKS } from '../constants/AppConstants'

export interface Book {
  id: Number;
  title: String;
  subtitle: String;
  description: String;
  genre: String;
  author: String;
  publisher: String;
  published_date: String;
  url: String;
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
    remove: (state: BooksState, action: PayloadAction<Number>) => {
      const bookList = state.bookList
      const bookId = action.payload

      const bookIndex = bookList.findIndex(book => book.id === bookId)

      bookList.splice(bookIndex, 1)

      state.bookList = bookList.map((book, index) => ({
        ...book,
        id: index
      }))
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

export const selectBookList = (state: RootState) => state.books.bookList

export default bookSlice.reducer