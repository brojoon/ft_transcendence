import React, { VFC } from 'react';
import { UserFriendCardContainer } from './style';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import Scrollbars from 'react-custom-scrollbars';
import { IFriendList, IAllUser } from '@typings/db';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

interface Props {
  userData: IUser | undefined | null;
}

const UserFriendCard: VFC<Props> = ({ userData }) => {
  const { data: userFriendList } = useSWR<IFriendList[]>(
    `/api/friend/friends/${userData?.userId}`,
    fetcher,
  );
  const { data: allUser } = useSWR<IAllUser[], any[]>('/api/users/alluser', fetcher);
  console.log();
  return (
    <UserFriendCardContainer>
      <div className="friends-header">Friends</div>
      <Scrollbars>
        <div>
          {userFriendList?.map((friend) => {
            return allUser?.map((user: IAllUser) => {
              if (friend.userId2 === user.userId) {
                return (
                  <Link to={`/users/${user?.userId}`}>
                    <ListItem className="list-item-wrapper" button>
                      <Avatar className="avatar" src={user?.profile} alt="Avatar" />
                      <ListItemText className="user" primary={user?.userId} />
                    </ListItem>
                  </Link>
                );
              }
            });
          })}
        </div>
      </Scrollbars>
    </UserFriendCardContainer>
  );
};

export default UserFriendCard;
