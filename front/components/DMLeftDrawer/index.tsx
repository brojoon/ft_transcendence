import React, { useCallback, useState } from 'react';
import ListItemText from '@mui/material/ListItemText';
import Scrollbars from 'react-custom-scrollbars';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import { IUser, IAllUser, IDmList, IBlockList } from '@typings/db';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import ListItemButton from '@mui/material/ListItemButton';
import { DMLeftDrawerContainer, DMListContainer } from './style';

const DMLeftDrawerBar = () => {
  const { data: dmlist } = useSWR<IDmList[]>('/api/dms/dmlist', fetcher);
  const { data: users } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);
  const { data: blockList } = useSWR<IBlockList[]>(`/api/friend/blocklist`, fetcher);
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = useCallback(
    (event: any, index: number) => {
      setSelectedIndex(index);
    },
    [selectedIndex, setSelectedIndex],
  );
  return (
    <DMLeftDrawerContainer>
      <input className="search-input" autoComplete="off"></input>
      <div className="friend-icon-wrapper">
        <Link to={`/social`}>
          <List className="friend-list-wrapper" component="nav" aria-label="main mailbox folders">
            <ListItemButton
              className="friend-list-btn"
              selected={selectedIndex === 0}
              onClick={(event: any) => handleListItemClick(event, 0)}
            >
              <EmojiPeopleRoundedIcon className="friend-list-icon" />
              <ListItemText primary="Friends" />
            </ListItemButton>
          </List>
        </Link>
      </div>
      <DMListContainer>
        <Scrollbars>
          <div>
            {dmlist?.map((dm: IDmList, index: number) => {
              let isblock = false;
              blockList?.map((blockedUser) => {
                if (blockedUser.userId2 === dm.userId) isblock = true;
              });
              if (!isblock) {
                return (
                  <Link to={`/social/dm/${dm.id}`}>
                    <List className="list" component="nav" aria-label="main mailbox folders">
                      <ListItemButton
                        className="list-item-button"
                        selected={selectedIndex === index + 1}
                        onClick={(event: any) => handleListItemClick(event, index + 1)}
                      >
                        {users?.map((user: any) => {
                          if (user.userId === dm.userId) {
                            return (
                              <>
                                <Avatar className="avatar" src={user.profile} alt="Avatar" />
                                <ListItemText className="user-id" primary={dm.userId} />
                              </>
                            );
                          }
                        })}
                      </ListItemButton>
                    </List>
                  </Link>
                );
              }
            })}
          </div>
        </Scrollbars>
      </DMListContainer>
    </DMLeftDrawerContainer>
  );
};

export default DMLeftDrawerBar;
