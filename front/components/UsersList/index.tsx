import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IAllUser } from '@typings/db';
import Scrollbars from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import { UsersListContainer } from './style';

const UserList = () => {
  const { data: users } = useSWR<IAllUser[], any[]>('/api/users/alluser', fetcher);
  return (
    <Scrollbars>
      <UsersListContainer>
        {users?.map((user) => {
          return (
            <Link to={`/users/${user.userId}`}>
              <ListItem className="list-item-wrapper" button>
                <Avatar className="avatar" src={user.profile} alt="Avatar" />
                <ListItemText className="user" primary={user.userId} />
              </ListItem>
            </Link>
          );
        })}
      </UsersListContainer>
    </Scrollbars>
  );
};

export default UserList;
