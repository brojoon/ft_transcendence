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
import config from '@utils/config';

interface Props {
  user: IAllUser;
  setSelectedIndex: (e: any) => void;
}

const AdminPageProfile: VFC<Props> = ({ user, setSelectedIndex }) => {
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
      .get(`/api/channels/ownerApi/siteOwnerChannelUserMuteSwitch/${id}/${user.userId}/20`, config)
      .then((res) => {
        setSelectedIndex(-1);
      })
      .catch(() => {});
  }, []);

  const onClickKickBtn = useCallback((e) => {
    e.preventDefault();
    axios
      .get(`/api/channels/ownerApi/siteOwnerChannelUserKick/${id}/${user.userId}`, config)
      .then((res) => {
        setSelectedIndex(-1);
      })
      .catch(() => {});
  }, []);

  const onClickBanBtn = useCallback((e) => {
    e.preventDefault();
    axios
      .get(`/api/channels/ownerApi/siteOwnerChannelUserBan/${id}/${user.userId}`, config)
      .then((res) => {
        setSelectedIndex(-1);
      })
      .catch(() => {});
  }, []);

  const onClickAppointAdmin = useCallback(
    (e) => {
      e.preventDefault();
      if (userAuth === 0) {
        axios
          .get(`/api/channels/ownerApi/siteOwnerChannelUserAdmin/${id}/${user.userId}`, config)
          .then(() => {
            setSelectedIndex(-1);
            mutateChannelUserList();
          })
          .catch(() => {});
      } else if (userAuth === 1) {
        axios
          .get(
            `/api/channels/ownerApi/siteOwnerChannelUserAdminRemove/${id}/${user.userId}`,
            config,
          )
          .then(() => {
            setSelectedIndex(-1);
            mutateChannelUserList();
          })
          .catch(() => {});
      }
    },
    [myAuth, userAuth],
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
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '9999',
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
        {userAuth !== 2 && (
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
          <Link to={`/users/${user.userId}`} style={{ textDecoration: 'none' }}>
            <Button
              style={{ color: '#979797', fontWeight: 600, margin: '17px 15px 20px 20px' }}
              variant="text"
            >
              profile
            </Button>
          </Link>
        </div>
        {userAuth === 0 && (
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

export default AdminPageProfile;