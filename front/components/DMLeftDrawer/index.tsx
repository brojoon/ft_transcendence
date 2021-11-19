import React, { useCallback, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Scrollbars from 'react-custom-scrollbars';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import { IUser, IAllUser, IDmList } from '@typings/db';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { dividerClasses } from '@mui/material';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import ListItemButton from '@mui/material/ListItemButton';

const style = {
  width: '100%',
  bgcolor: '#1e1e1e',
};

const DMLeftDrawerBar = () => {
  const { data: dmlist } = useSWR<IDmList[]>('/api/dms/dmlist', fetcher);
  const { data: users } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);
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
        width: '300px',
        height: '100%',
        padding: '30px 15px',
        backgroundColor: '#363636',
        borderRight: '1px solid #4f4f4f',
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
          height: '7%',
          color: 'black',
          border: 'none',
          padding: '0 12px',
        }}
      ></input>
      <div
        style={{
          borderTop: '1px solid #4f4f4f',
          borderBottom: '1px solid #4f4f4f',
          margin: '10px 0',
          padding: '10px 0',
          height: '14%',
        }}
      >
        <Link to={`/ft_transcendence/social`} style={{ textDecoration: 'none' }}>
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
              selected={selectedIndex === 0}
              style={{ color: 'white' }}
              onClick={(event: any) => handleListItemClick(event, 0)}
            >
              <EmojiPeopleRoundedIcon style={{ marginRight: '20px' }} />
              <ListItemText primary="Friends" />
            </ListItemButton>
          </List>
        </Link>
      </div>
      <div style={{ height: '79%' }}>
        <Scrollbars>
          <div>
            {dmlist?.map((dm: any, index: number) => {
              return (
                <Link
                  to={`/ft_transcendence/social/dm/${dm.id}`}
                  style={{ textDecoration: 'none' }}
                >
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
                      selected={selectedIndex === index + 1}
                      style={{ paddingLeft: '0' }}
                      onClick={(event: any) => handleListItemClick(event, index + 1)}
                    >
                      {users?.map((user: any) => {
                        if (
                          user.userId === dm.Dmcontents[0].userId1 &&
                          dm.Dmcontents[0].userId1 != myData?.userId
                        )
                          return (
                            <>
                              <Avatar
                                src={user.profile}
                                alt="Avatar"
                                style={{ border: '2px solid red' }}
                              />
                              <ListItemText
                                primary={dm.Dmcontents[0].userId1}
                                style={{ marginLeft: '12px', color: 'white' }}
                              />
                            </>
                          );
                        else if (
                          user.userId === dm.Dmcontents[0].userId2 &&
                          dm.Dmcontents[0]?.userId2 != myData?.userId
                        )
                          return (
                            <>
                              <Avatar
                                src={user.profile}
                                alt="Avatar"
                                style={{ border: '2px solid red' }}
                              />
                              <ListItemText
                                primary={dm.Dmcontents[0].userId2}
                                style={{ marginLeft: '12px', color: 'white' }}
                              />
                            </>
                          );
                      })}
                    </ListItemButton>
                  </List>
                </Link>
              );
            })}
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default DMLeftDrawerBar;
