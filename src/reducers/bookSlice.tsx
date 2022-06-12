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
      const { book, index } = action.payload

      state.bookList.splice(index, 1, book)
    },
    delete: (state: BooksState, action: PayloadAction<any>) => {
      
    },
    clear: (state: BooksState) => {
      state.bookList = BOOKS
    }
  },
})

// Action creators are generated for each case reducer function
export const { add, remove, update, clear } = bookSlice.actions

export const addBook = (bookObj: any) => (dispatch: any, getState: any) => {
  const { users: { userList }, books: { bookList} } = getState()

  const userExists = userList.find((user:any) => user.id == bookObj.owner)

  if (userExists){
    bookObj["owner"] = {
      id: userExists.id,
      label: userExists.name,
      value: userExists
    }
  } else {
    bookObj["owner"] = undefined
  }
  
  //Math.random() not recommended but at least have some level of random unique ID
  bookObj = Object.assign({}, { id: (Math.random() * (bookList.length * 999999)) }, bookObj)

  dispatch(add(bookObj))
}

export const updateBook = (bookObj: any, id: any) => (dispatch: any, getState: any) => {
  const { users: { userList }, books: { bookList } } = getState()

  const userExists = userList.find((user:any) => user.id == bookObj.owner)

  if (userExists){
    bookObj["owner"] = {
      id: userExists.id,
      label: userExists.name,
      value: userExists
    }
  } else {
    bookObj["owner"] = undefined
  }
  
  bookObj = Object.assign({}, { id: Number(id) }, bookObj)

  const bookIndex = bookList.findIndex((book: any) => book.id == id)

  dispatch(update({ book: bookObj, index: bookIndex }))
}

export const removeBook = (bookObj: any) => (dispatch: any, getState: any) => {

}

export const selectBookList = (state: RootState): Array<Book> => state.books.bookList

export default bookSlice.reducer