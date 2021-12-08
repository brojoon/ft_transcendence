import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import UserList from '@components/UsersList';
import { UsersContainer, Search, SearchIconWrapper, StyledInputBase } from './style';

export default function Users() {
  return (
    <UsersContainer>
      <Box className="wrapper">
        <AppBar className="app-bar" position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Users
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                autoComplete="off"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Toolbar>
          <UserList />
        </AppBar>
      </Box>
    </UsersContainer>
  );
}
