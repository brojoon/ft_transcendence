import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import gravatar from 'gravatar';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IAllUser, IFriendList, IBlockList } from '@typings/db';
import Scrollbars from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import { MuiList } from './style';

const BlockList = () => {
  const { data: users } = useSWR<IAllUser[], any[]>('/api/users/alluser', fetcher);
  const { data: blockList } = useSWR<IBlockList[]>(`/api/friend/blocklist`, fetcher);

  return (
    <Scrollbars>
      <MuiList>
        {blockList?.map((friend: any) => {
          return users?.map((user) => {
            if (user?.userId === friend?.userId2)
              return (
                <Link to={`/users/${user.userId}`}>
                  <ListItem className="block-list-wrapper" button>
                    <Avatar className="avatar" src={user.profile} alt="Avatar" />
                    <ListItemText className="list-text" primary={user.userId} />
                  </ListItem>
                </Link>
              );
          });
        })}
      </MuiList>
    </Scrollbars>
  );
};

export default BlockList;
