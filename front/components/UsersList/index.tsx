import React, { VFC, useContext } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { IAllUser } from '@typings/db';
import Scrollbars from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import { UsersListContainer, UserAvatar, ScrollbarColor } from './style';
import { SocketContext } from '@store/socket';

interface Props {
  userList: IAllUser[] | undefined;
}

const UserList: VFC<Props> = ({ userList }) => {
  const { onlineList, onGameList } = useContext(SocketContext);
  let isState;
  return (
    <Scrollbars renderThumbVertical={({ style, ...props }) => <ScrollbarColor {...props} />}>
      <UsersListContainer>
        {userList?.map((user: IAllUser) => {
          if (!user.username) return;
          isState = 0;
          if (onGameList && onGameList[user.userId]) isState = 2;
          if (isState === 0) {
            onlineList?.map((onlineUser) => {
              if (onlineUser.userId === user.userId) isState = 1;
            });
          }
          return (
            <Link to={`/users/${user.userId}`} key={user.userId}>
              <ListItem className="list-item-wrapper" button>
                <UserAvatar
                  isstate={`${
                    isState
                      ? isState === 1
                        ? '2px solid #1ed14b'
                        : '2px solid #FFD400'
                      : '2px solid #d63638'
                  }`}
                  src={user.profile}
                  alt="Avatar"
                />
                <ListItemText className="user" primary={user.username} />
              </ListItem>
            </Link>
          );
        })}
      </UsersListContainer>
    </Scrollbars>
  );
};

export default UserList;
