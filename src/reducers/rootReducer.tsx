import { combineReducers } from 'redux';

import booksReducer from './bookSlice'
import usersReducer from './userSlice'

const rootReducer = combineReducers({
  books: booksReducer,
  users: usersReducer
})

export default rootReducer;