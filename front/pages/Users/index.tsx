import React, { useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import UsersList from '@components/UsersList';
import useSWR from 'swr';
import { IAllUser } from '@typings/db';
import fetcher from '@utils/fetcher';

import { UsersContainer, Search, SearchIconWrapper, StyledInputBase } from './style';

let searchedUserList: IAllUser[] | undefined;

export default function Users() {
  const { data: allUserList } = useSWR<IAllUser[], any[]>('/api/users/alluser', fetcher);
  const [userSearchInputValue, setUserSearchInputValue] = useState('');

  const onChangeUserSearchInput = useCallback((e) => {
    setUserSearchInputValue(e.target.value);
    console.log(e.target.value);
  }, []);

  if (userSearchInputValue) {
    searchedUserList = allUserList?.filter((user) => {
      const regex = new RegExp(userSearchInputValue, 'gi');
      console.log('regex', regex);
      console.log(user.userId.match(regex));
      console.log(userSearchInputValue);
      return user.userId.match(regex);
    });
    console.log('searchedUserList', searchedUserList);
  }

  const getUserList = useCallback(
    (inputValue: string) => {
      console.log('getUserList', inputValue);
      if (!inputValue) return allUserList;
      else return searchedUserList;
    },
    [allUserList],
  );

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
                onChange={onChangeUserSearchInput}
              />
            </Search>
          </Toolbar>
          <UsersList userList={getUserList(userSearchInputValue)} />
        </AppBar>
      </Box>
    </UsersContainer>
  );
}
