import React, {
  useState,
  ChangeEvent
} from 'react'
import { 
  Box,
  Button,
  TextField
} from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle'
import LockOpen from '@mui/icons-material/LockOpen'

import { useAppDispatch } from '../redux/hooks';

import { userLogin } from '../reducers/userSlice';

import './Login.css'

const Login = (props:any): JSX.Element => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setUsername(value)
  }

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setPassword(value)
  }

  const onSubmit = () => {
    const data = {
      username,
      password
    }
    dispatch(userLogin(data))
  }

  return (
    <div className="loginContainer">
      <h2>Welcome to the Digital Library</h2>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize: 45 }} />
        <TextField onChange={handleUsername} id="input-with-sx" label="Username" variant="outlined" />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingTop: 1 }}>
        <LockOpen sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize: 45 }} />
        <TextField onChange={handlePassword} type="password" id="input-with-sx" label="Username" variant="outlined" />
      </Box>
      <div className="btnContainer">
        <button onClick={onSubmit} type="button" className='loginBtn'>Login</button> 
      </div>
    </div>
  );
}

export default Login;