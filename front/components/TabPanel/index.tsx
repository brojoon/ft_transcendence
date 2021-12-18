import React, { useContext } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IChannelList2, IAllUser, IUser, IMemberList } from '@typings/db';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Avatar from '@mui/material/Avatar';
import TabPanel from '@mui/lab/TabPanel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Scrollbars from 'react-custom-scrollbars';
import BasicModal from '@components/BasicModal';
import axios from 'axios';
import UserRightModal from '@components/UserRightModal';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams, useHistory, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import config from '@utils/config';
import AdminPageProfile from '@components/AdminPageProfile';
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
        {adminList?.map((admin) => {
          isState = 0;
          if (onGameList && onGameList[admin.userId]) isState = 2;
          if (isState === 0) {
            onlineList?.map((onlineUser) => {
              if (onlineUser.userId === admin.userId) isState = 1;
            });
          }
          return (
            <ListItem button>
              <UserAvatar
                isState={`${
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
