import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import { useNavigate } from "react-router-dom";

const NAVIGATION_PAGES = ["books", "analytics", "users"]

const NavigationBar = (): JSX.Element => {
  const navigate = useNavigate()

  const goToPage = (name: String) => {
    navigate(`/${name}`)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {
            NAVIGATION_PAGES.map((page, i) => (
              <Button
                key={`nav_${i}`}
                onClick={()=>{ goToPage(page) }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.toUpperCase()}
              </Button>
            ))
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavigationBar;