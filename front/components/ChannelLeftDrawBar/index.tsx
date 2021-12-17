import React, { useCallback, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Scrollbars from 'react-custom-scrollbars';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import { IUser, IAllUser, IDmList, IChannelList } from '@typings/db';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { Link, Redirect } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import ListItemButton from '@mui/material/ListItemButton';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FlareIcon from '@mui/icons-material/Flare';
import { ChannelLeftDrawBarContainer, ScrollbarColor } from './style';

let channelList2: IChannelList[] | undefined;

const ChannelLeftDrawBar = () => {
  const { data: users } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);
  const { data: channelList } = useSWR<IChannelList[]>('/api/channels/myChannelList', fetcher);
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [channelSearchInputValue, setChannelSearchInputValue] = useState('');

  const handleListItemClick = useCallback(
    (event: any, index: number) => {
      setSelectedIndex(index);
    },
    [selectedIndex, setSelectedIndex],
  );

  const onChangeChannelSearchInput = useCallback((e) => {
    setChannelSearchInputValue(e.target.value);
  }, []);

  if (channelSearchInputValue) {
    channelList2 = channelList?.filter((channel) => {
      const regex = new RegExp(channelSearchInputValue, 'gi');
      return channel.name.match(regex);
    });
  }

  const getChannelList = useCallback(
    (inputValue: string) => {
      if (!inputValue) return channelList;
      else return channelList2;
    },
    [channelList],
  );

  return (
    <ChannelLeftDrawBarContainer>
      <input
        className="search-input"
        autoComplete="off"
        onChange={onChangeChannelSearchInput}
        value={channelSearchInputValue}
      ></input>
      <div className="header-wrapper">
        <Link to={`/channels`}>
          <List
            className="channel-discover-wrapper"
            component="nav"
            aria-label="main mailbox folders"
          >
            <ListItemButton
              className="channel-discover-btn"
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <FlareIcon className="fireicon" />
              <ListItemText primary="Discover" />
            </ListItemButton>
          </List>
        </Link>
      </div>
      <div className="channel-list-wrapper">
        <Scrollbars
          autoHide
          renderThumbVertical={({ style, ...props }) => <ScrollbarColor {...props} />}
        >
          {getChannelList(channelSearchInputValue)?.map((channel: any, index) => {
            let channelMode = '';
            if (channel.type === 0) {
              channelMode = 'Public';
            } else if (channel.type === 1) {
              channelMode = 'Protected';
            } else if (channel.type === 2) {
              channelMode = 'Private';
            }
            return (
              <Link to={`/channels/${channel.id}`}>
                <List className="channel-list" component="nav" aria-label="main mailbox folders">
                  <ListItemButton
                    className="channel-list-btn"
                    selected={selectedIndex === index + 1}
                    onClick={(event) => handleListItemClick(event, index + 1)}
                  >
                    <ListItemText
                      className="channel-list-text"
                      primary={channel.name}
                      secondary={channelMode}
                    />
                  </ListItemButton>
                </List>
              </Link>
            );
          })}
        </Scrollbars>
      </div>
      <div className="footer">
        <Link to={`/channels/create`}>
          <Button className="create-btn" variant="contained">
            CREATE&nbsp;&nbsp;+
          </Button>
        </Link>
      </div>
    </ChannelLeftDrawBarContainer>
  );
};

export default ChannelLeftDrawBar;
