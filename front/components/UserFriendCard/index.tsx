import React, { VFC, useContext } from 'react';
import { UserFriendCardContainer, UserAvatar, ScrollbarColor } from './style';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import Scrollbars from 'react-custom-scrollbars';
import { IFriendList, IAllUser } from '@typings/db';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { SocketContext } from '@store/socket';

interface Props {
  userData: IUser | undefined | null;
}

const UserFriendCard: VFC<Props> = ({ userData }) => {
  const { data: userFriendList } = useSWR<IFriendList[]>(
    `/api/friend/friends/${userData?.userId}`,
    fetcher,
  );
  const { data: allUser } = useSWR<IAllUser[], any[]>('/api/users/alluser', fetcher);
  const { onlineList, onGameList } = useContext(SocketContext);
  let isState;
  return (
    <UserFriendCardContainer>
      <div className="friends-header">Friends</div>
      {userFriendList?.length ? (
        <Scrollbars renderThumbVertical={({ style, ...props }) => <ScrollbarColor {...props} />}>
          <div>
            {userFriendList?.map((friend) => {
              return allUser?.map((user: IAllUser) => {
                if (friend.userId2 === user.userId) {
                  isState = 0;
                  if (onGameList && onGameList[user.userId]) isState = 2;

                  if (isState === 0) {
                    onlineList?.map((onlineUser) => {
                      if (onlineUser.userId === user.userId) isState = 1;
                    });
                  }
                  return (
                    <Link to={`/users/${user?.userId}`} key={user.userId}>
                      <ListItem className="list-item-wrapper" button>
                        <UserAvatar
                          isstate={`${
                            isState
                              ? isState === 1
                                ? '2px solid #1ed14b'
                                : '2px solid #FFD400'
                              : '2px solid #d63638'
                          }`}
                          src={user?.profile}
                          alt="Avatar"
                        />
                        <ListItemText className="user" primary={user?.username} />
                      </ListItem>
                    </Link>
                  );
                }
              });
            })}
          </div>
        </Scrollbars>
      ) : (
        <div className="no-friend-wrapper">
          <span>no friend found</span>
        </div>
      )}
    </UserFriendCardContainer>
  );
};

export default UserFriendCard;
