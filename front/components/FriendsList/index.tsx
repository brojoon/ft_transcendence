import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import gravatar from 'gravatar';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IAllUser, IFriendList } from '@typings/db';
import Scrollbars from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';

const style = {
  width: '100%',
  bgcolor: '#1e1e1e',
};

const FriendsList = () => {
  const { data: users } = useSWR<IAllUser[], any[]>('/api/users/alluser', fetcher);
  const { data: friends } = useSWR<IFriendList[]>(`/api/friend/friendlist`, fetcher);

  return (
    <Scrollbars>
      <List sx={style} component="nav" aria-label="mailbox folders" style={{ height: '100%' }}>
        {friends?.map((friend: any) => {
          return users?.map((user) => {
            if (user?.userId === friend?.userId2)
              return (
                <Link
                  to={`/users/${user.userId}`}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <ListItem button>
                    <Avatar src={user.profile} alt="Avatar" style={{ border: '2px solid red' }} />
                    <ListItemText primary={user.userId} style={{ marginLeft: '12px' }} />
                  </ListItem>
                </Link>
              );
          });
        })}
      </List>
    </Scrollbars>
  );
};

export default FriendsList;
