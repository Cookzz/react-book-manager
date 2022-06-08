import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Book {
  title: string;
  genre: string;
  author: string;
  publishing_year: number;
  owner: Object;
}

export interface BooksState {
  bookList: Array<Book>
}

const initialState: BooksState = {
  bookList: [],
}

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state: BooksState, action: PayloadAction<Book>) => {
      state.bookList.push(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const {  } = bookSlice.actions

export default bookSlice.reducer