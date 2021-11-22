import React, { useState, VFC, useCallback } from 'react';
import ChannelProfile from '@components/ChannelProfile';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { IAllUser } from '@typings/db';
import Avatar from '@mui/material/Avatar';

interface Props {
  user: IAllUser;
}

const ChannelMember: VFC<Props> = ({ user }) => {
  const [isChannelProfileModal, setIsChannelProfileModal] = useState(false);
  const ChannelProfileModal = useCallback(
    (e) => {
      e.preventDefault();
      setIsChannelProfileModal((prev) => !prev);
    },
    [isChannelProfileModal],
  );
  return (
    <>
      {isChannelProfileModal && <ChannelProfile />}
      <ListItem button onClick={ChannelProfileModal}>
        <Avatar
          src={user.profile}
          alt="Avatar"
          style={{ border: '2px solid red', width: '38px', height: '38px' }}
        />
        <ListItemText primary={user.userId} style={{ marginLeft: '12px', color: 'white' }} />
      </ListItem>
    </>
  );
};

export default ChannelMember;
