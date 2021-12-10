import React, { VFC } from 'react';
import { UserFriendCardContainer } from './style';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { IUser } from '@typings/db';

interface Props {
  userData: IUser | undefined | null;
}

const UserFriendCard: VFC<Props> = ({ userData }) => {
  return (
    <UserFriendCardContainer>
      <div className="friends-header">Friends</div>
    </UserFriendCardContainer>
  );
};

export default UserFriendCard;
