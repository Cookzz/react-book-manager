import React, {
  useEffect,
  useState
} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout } from '../reducers/userSlice';
import { selectUser } from '../reducers/userSlice';

const NavigationBar = (): JSX.Element => {
  const [navigationPages, setNavigationPages] = useState(["books", "analytics", "users"])

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  useEffect(()=>{
    if (user?.user_type !== "Admin"){
      setNavigationPages(["books"])
    }
  }, [user?.user_type])

  const goToPage = (name: String) => {
    navigate(`/${name}`)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {
            navigationPages.map((page, i) => (
              <Button
                key={`nav_${i}`}
                onClick={()=>{ goToPage(page) }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.toUpperCase()}
              </Button>
            ))
          }
          <Button
            onClick={()=>{ dispatch(logout()) }}
            sx={{ my: 2, color: 'white', display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavigationBar;