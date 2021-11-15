import React, { VFC, useState, useCallback } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Scrollbars from 'react-custom-scrollbars';
import { useParams, useHistory } from 'react-router-dom';
import { IAllUser, IMemberList, IUser, IChannelList } from '@typings/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BasicModal from '@components/BasicModal';
import getToken from '@utils/getToken';
import axios from 'axios';
import ChannelInviteModal from '@components/ChannelInviteModal';

interface Props {
  onClickSettingBtn: (e: any) => void;
}
const ChannelMemberDrawBar: VFC<Props> = ({ onClickSettingBtn }) => {
  const { id } = useParams<{ id: string }>();
  const { data: memberList } = useSWR<IMemberList[]>(`/api/channels/userList/${id}`, fetcher);
  const { data: alluser } = useSWR<IAllUser[], any[]>('/api/users/alluser', fetcher);
  const { data: allChannelList, mutate: mutateAllChannelList } = useSWR<IChannelList[]>(
    `/api/channels/allChannelList`,
    fetcher,
  );
  const { data: myChannelList, mutate: mutateMyChannelList } = useSWR<IChannelList[]>(
    `/api/channels/myChannelList`,
    fetcher,
  );
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const [channelLeaveModal, setChannelLeaveModal] = useState(false);
  const [channelInviteModal, setChannelInviteModal] = useState(false);
  const history = useHistory();
  if (memberList?.length === 0) {
    history.push('/ft_transcendence/channels');
  }

  const onClickChannelInviteModal = useCallback(
    (e) => {
      e.preventDefault();
      setChannelInviteModal((prev) => !prev);
    },
    [channelInviteModal],
  );
  const onClickChannelLeaveModal = useCallback(
    (e) => {
      e.preventDefault();
      setChannelLeaveModal((prev) => !prev);
    },
    [channelLeaveModal, setChannelLeaveModal],
  );
  const onClickChannelLeaveMdoalYes = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .get(`/api/channels/getout/${id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then(() => {
          mutateAllChannelList();
          mutateMyChannelList();
          setChannelLeaveModal(false);
          history.push('/ft_transcendence/channels');
        });
    },
    [channelLeaveModal],
  );
  return (
    <div
      style={{
        backgroundColor: '#363636',
        width: '380px',
        height: '100%',
        right: 0,
        // left: 'auto',
        // transform: 'translate(0%)',
        // overflowY: 'auto',
        // overflowX: 'hidden',
        display: 'flex',
        margin: 0,
        flexDirection: 'column',
        alignItems: 'center',
        // visibility: 'hidden',
      }}
    >
      {channelInviteModal && <ChannelInviteModal onClickModalClose={onClickChannelInviteModal} />}
      {channelLeaveModal && (
        <BasicModal
          content={`Are you really leaving this channel?`}
          NoBtn={onClickChannelLeaveModal}
          YesBtn={onClickChannelLeaveMdoalYes}
        />
      )}
      <Scrollbars>
        <div>
          <ListItem style={{ fontSize: '12px', marginTop: '11px', color: 'gray' }}>Owner</ListItem>
          {memberList &&
            memberList?.map((member) => {
              if (member.auth === 2) {
                return alluser?.map((user) => {
                  if (user.userId == member.userId) {
                    return (
                      <ListItem button>
                        <Avatar
                          src={user.profile}
                          alt="Avatar"
                          style={{ border: '2px solid red', width: '38px', height: '38px' }}
                        />
                        <ListItemText
                          primary={user.userId}
                          style={{ marginLeft: '12px', color: 'white' }}
                        />
                      </ListItem>
                    );
                  }
                });
              }
            })}
          <ListItem style={{ fontSize: '12px', marginTop: '11px', color: 'gray' }}>Admin</ListItem>
          {memberList &&
            memberList?.map((member) => {
              if (member.auth === 1) {
                return alluser?.map((user) => {
                  if (user.userId == member.userId) {
                    return (
                      <ListItem button>
                        <Avatar
                          src={user.profile}
                          alt="Avatar"
                          style={{ border: '2px solid red', width: '38px', height: '38px' }}
                        />
                        <ListItemText
                          primary={user.userId}
                          style={{ marginLeft: '12px', color: 'white' }}
                        />
                      </ListItem>
                    );
                  }
                });
              }
            })}
          <ListItem style={{ fontSize: '12px', marginTop: '11px', color: 'gray' }}>Users</ListItem>
          {memberList &&
            memberList?.map((member) => {
              if (member.auth === 0) {
                return alluser?.map((user) => {
                  if (user.userId == member.userId) {
                    return (
                      <ListItem button>
                        <Avatar
                          src={user.profile}
                          alt="Avatar"
                          style={{ border: '2px solid red', width: '38px', height: '38px' }}
                        />
                        <ListItemText
                          primary={user.userId}
                          style={{ marginLeft: '12px', color: 'white' }}
                        />
                      </ListItem>
                    );
                  }
                });
              }
            })}
        </div>
      </Scrollbars>
      <Button
        variant="contained"
        onClick={onClickSettingBtn}
        style={{
          width: '200px',
          height: '35px',
          backgroundColor: '#597aff',
          borderColor: '#597aff',
          fontWeight: 'bold',
          margin: '10px 0',
        }}
      >
        SETTING &nbsp;
        <SettingsIcon />
      </Button>
      <Button
        variant="contained"
        onClick={onClickChannelInviteModal}
        style={{
          width: '200px',
          height: '35px',
          backgroundColor: '#597aff',
          borderColor: '#597aff',
          fontWeight: 'bold',
          margin: '10px 0',
        }}
      >
        INVITE &nbsp;
        <PersonAddIcon />
      </Button>
      <Button
        variant="contained"
        onClick={onClickChannelLeaveModal}
        style={{
          width: '200px',
          height: '35px',
          backgroundColor: '#597aff',
          borderColor: '#597aff',
          fontWeight: 'bold',
          margin: '10px 0',
        }}
      >
        LEAVE &nbsp;
        <ExitToAppIcon />
      </Button>
    </div>
  );
};

export default ChannelMemberDrawBar;
