import React, { useCallback } from 'react';
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

  const onClickDMuser = useCallback(() => {
    console.log('hi');
  }, []);
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
        <ListItem button style={{ backgroundColor: '#666666' }}>
          <ListItemText primary="Freinds" style={{ color: 'white' }} />
        </ListItem>
      </div>
      <div style={{ height: '79%' }}>
        <Scrollbars>
          <div>
            {dmlist?.map((dm: any) => {
              return (
                <Link
                  to={`/ft_transcendence/social/dm/${dm.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <ListItem button style={{ paddingLeft: '0' }} onClick={onClickDMuser}>
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
                  </ListItem>
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
