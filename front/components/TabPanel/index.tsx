import React, { useContext } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IAllUser } from '@typings/db';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Scrollbars from 'react-custom-scrollbars';
import { UserAvatar } from './style';
import { SocketContext } from '@store/socket';

export const TabPanel1 = () => {
  const { data: adminList, mutate: mutateAdminList } = useSWR<IAllUser[]>(
    '/api/users/listAdmin',
    fetcher,
  );
  const { onlineList, onGameList } = useContext(SocketContext);
  let isState;

  return (
    <Scrollbars>
      <List sx={{ width: '100%' }} component="nav" aria-label="mailbox folders">
        {adminList &&
          adminList?.map((admin) => {
            isState = 0;
            if (onGameList && onGameList[admin.userId]) isState = 2;
            if (isState === 0) {
              onlineList?.map((onlineUser) => {
                if (onlineUser.userId === admin.userId) isState = 1;
              });
            }
            return (
              <ListItem button key={admin.userId}>
                <UserAvatar
                  isstate={`${
                    isState
                      ? isState === 1
                        ? '2px solid #1ed14b'
                        : '2px solid #FFD400'
                      : '2px solid #d63638'
                  }`}
                  src={admin.profile}
                  alt="Avatar"
                />
                <ListItemText primary={admin.userId} style={{ marginLeft: '12px' }} />
              </ListItem>
            );
          })}
      </List>
    </Scrollbars>
  );
};
