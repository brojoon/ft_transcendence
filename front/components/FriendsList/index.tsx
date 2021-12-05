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
import { FriendListContainer } from './style';

const FriendsList = () => {
  const { data: users } = useSWR<IAllUser[], any[]>('/api/users/alluser', fetcher);
  const { data: friends } = useSWR<IFriendList[]>(`/api/friend/friendlist`, fetcher);

  return (
    <Scrollbars>
      <FriendListContainer aria-label="mailbox folders">
        {friends?.map((friend: any) => {
          return users?.map((user) => {
            if (user?.userId === friend?.userId2)
              return (
                <Link to={`/users/${user.userId}`}>
                  <ListItem button>
                    <Avatar className="avatar" src={user.profile} alt="Avatar" />
                    <ListItemText className="text" primary={user.userId} />
                  </ListItem>
                </Link>
              );
          });
        })}
      </FriendListContainer>
    </Scrollbars>
  );
};

export default FriendsList;
