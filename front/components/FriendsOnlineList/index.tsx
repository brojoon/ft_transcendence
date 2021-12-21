import React, { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IAllUser, IFriendList } from '@typings/db';
import Scrollbars from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import { FriendsOnlineListContainer, UserAvatar, ScrollbarColor } from './style';
import { SocketContext } from '@store/socket';

const FriendsOnlineList = () => {
  const { data: users } = useSWR<IAllUser[], any[]>('/api/users/alluser', fetcher);
  const { data: friends } = useSWR<IFriendList[]>(`/api/friend/friendlist`, fetcher);
  const { onlineList, onGameList } = useContext(SocketContext);
  let isState;

  return (
    <Scrollbars renderThumbVertical={({ style, ...props }) => <ScrollbarColor {...props} />}>
      <FriendsOnlineListContainer aria-label="mailbox folders">
        {friends?.map((friend: any) => {
          return users?.map((user) => {
            if (user?.userId === friend?.userId2) {
              isState = 0;
              if (onGameList && onGameList[user.userId]) isState = 2;

              if (isState === 0) {
                onlineList?.map((onlineUser) => {
                  if (onlineUser.userId === user.userId) isState = 1;
                });
              }
              if (isState === 0) return;
              return (
                <Link to={`/users/${user.userId}`} key={user.userId}>
                  <ListItem className="friend-list-wrapper" button>
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
                    <ListItemText className="text" primary={user.username} />
                  </ListItem>
                </Link>
              );
            }
          });
        })}
      </FriendsOnlineListContainer>
    </Scrollbars>
  );
};

export default FriendsOnlineList;
