import React, { useContext } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IAllUser, IBlockList } from '@typings/db';
import Scrollbars from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import { MuiList, UserAvatar, ScrollbarColor } from './style';
import { SocketContext } from '@store/socket';

const BlockList = () => {
  const { data: users } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);
  const { data: blockList } = useSWR<IBlockList[]>(`/api/friend/blocklist`, fetcher);
  const { onlineList, onGameList } = useContext(SocketContext);
  let isState;

  return (
    <Scrollbars renderThumbVertical={({ style, ...props }) => <ScrollbarColor {...props} />}>
      <MuiList>
        {blockList?.map((blockUser: IBlockList) => {
          return users?.map((user) => {
            if (user?.userId === blockUser?.userId2) {
              isState = 0;
              if (onGameList && onGameList[user.userId]) isState = 2;
              if (isState === 0) {
                onlineList?.map((onlineUser) => {
                  if (onlineUser.userId === user.userId) isState = 1;
                });
              }
              return (
                <Link to={`/users/${user.userId}`} key={blockUser.userId2}>
                  <ListItem className="block-list-wrapper" button>
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
                    <ListItemText className="list-text" primary={user.username} />
                  </ListItem>
                </Link>
              );
            }
          });
        })}
      </MuiList>
    </Scrollbars>
  );
};

export default BlockList;
