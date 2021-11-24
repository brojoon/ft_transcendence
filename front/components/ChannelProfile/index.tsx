import React, { VFC, useCallback } from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import PowerIcon from '@mui/icons-material/Power';
import VoiceOverOffSharpIcon from '@mui/icons-material/VoiceOverOffSharp';
import SensorsIcon from '@mui/icons-material/Sensors';
import SensorsOffIcon from '@mui/icons-material/SensorsOff';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { IAllUser, IMemberList, IUser, IDmList, IBlockList } from '@typings/db';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import getToken from '@utils/getToken';
import axios from 'axios';
import { useParams, Link, useHistory } from 'react-router-dom';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';

interface Props {
  user: IAllUser;
}

const ChannelProfile: VFC<Props> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const { data: dmList, mutate: mutateDmList } = useSWR<IDmList[]>('/api/dms/dmlist', fetcher);
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: blockList } = useSWR<IBlockList[]>(`/api/friend/blocklist`, fetcher);
  const { data: channelUserList, mutate: mutateChannelUserList } = useSWR<IMemberList[]>(
    `/api/channels/userList/${id}`,
    fetcher,
  );

  let isBlcok = false;

  const history = useHistory();
  let myAuth = -1;
  let userAuth = -1;

  channelUserList?.map((channeluser) => {
    if (channeluser.userId === user.userId) {
      userAuth = channeluser.auth;
    } else if (channeluser.userId === myData?.userId) {
      myAuth = channeluser.auth;
    }
  });

  const onClickMuteBtn = useCallback((e) => {
    e.preventDefault();
    axios
      .get(`/api/channels/muteUser/${id}/${user.userId}/20`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {})
      .catch(() => {});
  }, []);

  const onClickKickBtn = useCallback((e) => {
    e.preventDefault();
    axios
      .get(`/api/channels/kickUser/${id}/${user.userId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {})
      .catch(() => {});
  }, []);

  const onClickBanBtn = useCallback((e) => {
    e.preventDefault();
    axios
      .get(`/api/channels/banUser/${id}/${user.userId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {})
      .catch(() => {});
  }, []);

  const onClickMessageBtn = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .get(`/api/dms/create/${user.userId}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then((res) => {
          mutateDmList();
          history.push(`/ft_transcendence/social/dm/${res.data}`);
        })
        .catch(() => {});
    },
    [user, mutateDmList, dmList],
  );

  const onClickAppointAdmin = useCallback(
    (e) => {
      e.preventDefault();
      if (userAuth === 0) {
        axios
          .get(`/api/channels/giveAdmin/${id}/${user.userId}`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          })
          .then(() => {
            mutateChannelUserList();
          })
          .catch(() => {});
      } else if (userAuth === 1) {
        axios
          .get(`/api/channels/removeAdmin/${id}/${user.userId}`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          })
          .then(() => {
            mutateChannelUserList();
          })
          .catch(() => {});
      }
    },
    [myAuth],
  );
  return (
    <div
      style={{
        fontSize: '20px',
        width: '300px',
        height: '360px',
        fontWeight: 600,
        backgroundColor: '#1e1e1e',
        color: 'white',
        position: 'fixed',
        left: '-301px',
        boxShadow:
          '0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)',
      }}
    >
      <div style={{ display: 'flex', borderBottom: '1px solid #3a3a3a' }}>
        <div>
          <Avatar
            src={user.profile}
            alt="Avatar"
            style={{
              border: '2px solid red',
              width: '40px',
              height: '40px',
              margin: '17px 15px 20px 20px',
            }}
          />
        </div>
        <div style={{ lineHeight: '70px' }}>{user.userId}</div>
        {myAuth === 2 && userAuth !== 2 && (
          <div>
            <Button
              onClick={onClickAppointAdmin}
              style={{
                color: '' + (userAuth === 1 ? '#f33c36' : '#002BC'),
                fontWeight: 600,
                margin: '18px 0 0 40px',
              }}
              variant="text"
            >
              admin
            </Button>
          </div>
        )}
      </div>
      <div style={{ borderBottom: '1px solid #3a3a3a' }}>
        <div style={{ margin: '17px 15px 20px 20px', display: 'flex' }}>
          <EmojiEventsIcon style={{ fontSize: '40px' }} />
          <div style={{ marginLeft: '15px', lineHeight: '40px' }}>Win Count</div>
        </div>
        <div style={{ margin: '17px 15px 20px 20px', display: 'flex' }}>
          <EventBusyIcon style={{ fontSize: '40px' }} />
          <div style={{ marginLeft: '15px', lineHeight: '40px' }}>Loss Count</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ borderBottom: '1px solid #3a3a3a' }}>
          <Link to={`/ft_transcendence/users/${user.userId}`} style={{ textDecoration: 'none' }}>
            <Button
              style={{ color: '#979797', fontWeight: 600, margin: '17px 15px 20px 20px' }}
              variant="text"
            >
              profile
            </Button>
          </Link>
          {blockList?.map((blockedUser: IBlockList) => {
            if (blockedUser.userId2 === user.userId) isBlcok = true;
          })}
          {!isBlcok && (
            <Button
              onClick={onClickMessageBtn}
              style={{ color: '#43a047', fontWeight: 600, margin: '17px 15px 20px 20px' }}
              variant="text"
            >
              message
            </Button>
          )}
        </div>
        {userAuth === 0 && (myAuth === 1 || myAuth === 2) && (
          <div>
            <Button
              onClick={onClickMuteBtn}
              style={{ color: '#d50000', fontWeight: 600, margin: '17px 15px 20px 20px' }}
              variant="text"
            >
              mute
            </Button>
            <Button
              onClick={onClickKickBtn}
              style={{ color: '#d50000', fontWeight: 600, margin: '17px 15px 20px 20px' }}
              variant="text"
            >
              kick
            </Button>
            <Button
              onClick={onClickBanBtn}
              style={{ color: '#d50000', fontWeight: 600, margin: '17px 15px 20px 20px' }}
              variant="text"
            >
              ban
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelProfile;
