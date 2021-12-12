import React, { VFC } from 'react';
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

interface Props {
  userList: IAllUser[] | undefined;
}

const UserList: VFC<Props> = ({ userList }) => {
  return (
    <Scrollbars>
      <UsersListContainer>
        {userList?.map((user: IAllUser) => {
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
