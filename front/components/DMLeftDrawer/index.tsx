import React, { useCallback, useState, useContext } from 'react';
import ListItemText from '@mui/material/ListItemText';
import Scrollbars from 'react-custom-scrollbars';
import List from '@mui/material/List';
import { IUser, IAllUser, IDmList, IBlockList } from '@typings/db';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import ListItemButton from '@mui/material/ListItemButton';
import { DMLeftDrawerContainer, DMListContainer, UserAvatar, ScrollbarColor } from './style';
import { SocketContext } from '@store/socket';

let dmlist2: IDmList[] | undefined;

const DMLeftDrawerBar = () => {
  const { data: dmlist } = useSWR<IDmList[]>('/api/dms/dmlist', fetcher);
  const { data: users } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);
  const { data: blockList } = useSWR<IBlockList[]>(`/api/friend/blocklist`, fetcher);
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dmSearchInputValue, setDMSearchInputValue] = useState('');
  const { onlineList, onGameList } = useContext(SocketContext);
  let isState;

  const handleListItemClick = useCallback(
    (event: any, index: number) => {
      setSelectedIndex(index);
    },
    [selectedIndex, setSelectedIndex],
  );

  const onChangeDMSearchInput = useCallback((e) => {
    setDMSearchInputValue(e.target.value);
  }, []);

  if (dmSearchInputValue && dmSearchInputValue.indexOf('\\') === -1) {
    dmlist2 = dmlist?.filter((dm) => {
      const regex = new RegExp(dmSearchInputValue, 'gi');
      return dm.username.match(regex);
    });
  }

  const getDMList = useCallback(
    (inputValue: string) => {
      if (!inputValue) return dmlist;
      else return dmlist2;
    },
    [dmlist],
  );

  return (
    <DMLeftDrawerContainer>
      <input
        className="search-input"
        onChange={onChangeDMSearchInput}
        value={dmSearchInputValue}
        autoComplete="off"
      ></input>
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
        <Scrollbars
          autoHide
          renderThumbVertical={({ style, ...props }) => <ScrollbarColor {...props} />}
        >
          <div>
            {getDMList(dmSearchInputValue)?.map((dm: IDmList, index: number) => {
              let isblock = false;
              blockList?.map((blockedUser) => {
                if (blockedUser.userId2 === dm.userId) isblock = true;
              });
              if (!isblock) {
                return (
                  <Link to={`/social/dm/${dm.id}`} key={dm.id}>
                    <List className="list" component="nav" aria-label="main mailbox folders">
                      <ListItemButton
                        className="list-item-button"
                        selected={selectedIndex === index + 1}
                        onClick={(event: any) => handleListItemClick(event, index + 1)}
                      >
                        {users?.map((user: any) => {
                          if (user.userId === dm.userId) {
                            isState = 0;
                            if (onGameList && onGameList[user.userId]) isState = 2;
                            if (isState === 0) {
                              onlineList?.map((onlineUser) => {
                                if (onlineUser.userId === user.userId) isState = 1;
                              });
                            }
                            return (
                              <div className="user-avatar-id-wrapper" key={dm.id}>
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
                                <ListItemText className="user-id" primary={user.username} />
                              </div>
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
