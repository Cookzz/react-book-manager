import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import { USERS } from '../constants/AppConstants'

export interface Users {
  id: number;
  username: string;
  name: string;
  password: string;
  phone: number;
  email: string;
  user_type: string;
}

//its just users but with password excluded since its unnecessary when logged in
export interface User {
  id: number;
  username: string;
  name: string;
  phone: number;
  email: string;
  user_type: string;
}

export interface UserState {
  user: User | any;
  userList: Array<Users>
}

const initialState: UserState = {
  user: null,
  userList: USERS
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    add: (state: UserState, action: PayloadAction<Users>) => {
      state.userList.push(action.payload)
    },
    remove: (state: UserState, action: PayloadAction<number>) => {
      const userList = state.userList
      const userId = action.payload

      const userIndex = userList.findIndex(user => user.id === userId)

      //normally deleting is handled by the API, but currently it will be handled by splicing
      userList.splice(userIndex, 1)

      state.userList = userList;
    },
    update: (state: UserState, action: PayloadAction<any>) => {
      
    },
    login: (state: UserState, action: PayloadAction<any>) => {
      state.user = action.payload
    },
    logout: (state: UserState) => {
      state.user = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, remove, update, login, logout } = userSlice.actions

export const userLogin = (data: any) => (dispatch: any,  getState: any) => {
  const { users: { userList } } = getState()

  const { username, password } = data

  const userExists = userList.some((user: Users) => (user.username === username && user.password === password))

  if (userExists){
    const userData = userList.find((user: Users) => (user.username === username && user.password === password))
    
    dispatch(login(userData))
  } else {
    alert("Wrong credentials. Please try again.")
  }
}

export const userLogout = () => (dispatch: any) => {
  dispatch(logout())
}

export const addUser = (userObj: any) => (dispatch: any, getState: any) => {
  
}

export const removeUser = (userObj: any) => (dispatch: any, getState: any) => {
  
}

export const selectUserList = (state: RootState): Array<Users> => state.users.userList
export const selectUser = (state: RootState): any => state.users.user

export default userSlice.reducer