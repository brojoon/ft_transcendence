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
const style = {
  width: '100%',
  bgcolor: '#1e1e1e',
};

const ChannelLeftDrawBar = () => {
  const { data: users } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);
  const { data: channelList } = useSWR<IChannelList[]>('/api/channels/myChannelList', fetcher);
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
    <div
      style={{
        width: '280px',
        height: '100%',
        padding: '30px 15px',
        backgroundColor: '#363636',
        borderRight: '1px solid #4f4f4f',
        overflowY: 'hidden',
      }}
    >
      <input
        style={{
          width: '100%',
          outline: 'none',
          resize: 'none',
          borderRadius: '4px',
          background: '#bdbdbd',
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          color: 'black',
          border: 'none',
          padding: '0 15px',
          height: '7%',
        }}
      ></input>
      <div
        style={{
          borderTop: '1px solid #4f4f4f',
          borderBottom: '1px solid #4f4f4f',
          margin: '10px 0',
          paddingTop: '3px',
          height: '14%',
        }}
      >
        <Link to={`/ft_transcendence/channels`} style={{ textDecoration: 'none' }}>
          <List
            component="nav"
            aria-label="main mailbox folders"
            sx={{
              '& .css-cvhtoe-MuiButtonBase-root-MuiListItemButton-root.Mui-selected': {
                bgcolor: '#666666',
              },
            }}
          >
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
              style={{ color: 'white' }}
            >
              <FlareIcon style={{ marginRight: '15px' }} />
              <ListItemText primary="Discover" />
            </ListItemButton>
          </List>
        </Link>
      </div>
      <div style={{ height: '70%' }}>
        <Scrollbars>
          {channelList?.map((channel: any, index) => {
            let channelMode = '';
            if (channel.type === 0) {
              channelMode = 'Public';
            } else if (channel.type === 1) {
              channelMode = 'Protected';
            } else if (channel.type === 2) {
              channelMode = 'Private';
            }
            return (
              <Link
                to={`/ft_transcendence/channels/${channel.id}`}
                style={{ textDecoration: 'none' }}
              >
                <List
                  component="nav"
                  aria-label="main mailbox folders"
                  sx={{
                    '& .css-cvhtoe-MuiButtonBase-root-MuiListItemButton-root.Mui-selected': {
                      bgcolor: '#666666',
                    },
                    margin: 0,
                    padding: 0,
                  }}
                >
                  <ListItemButton
                    style={{ padding: 0, margin: 0 }}
                    selected={selectedIndex === index + 1}
                    onClick={(event) => handleListItemClick(event, index + 1)}
                  >
                    <ListItemText
                      style={{ color: 'white', margin: '4px 0 4px 18px' }}
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
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '11%' }}
      >
        <Link to={`/ft_transcendence/channels/create`} style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            style={{
              width: '180px',
              height: '35px',
              backgroundColor: '#597aff',
              borderColor: '#597aff',
              fontWeight: 'bold',
            }}
          >
            CREATE&nbsp;&nbsp;+
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ChannelLeftDrawBar;
