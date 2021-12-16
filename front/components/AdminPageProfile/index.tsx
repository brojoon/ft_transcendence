import React, { VFC, useCallback } from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { IAllUser, IMemberList, IUser } from '@typings/db';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useParams, Link, useHistory } from 'react-router-dom';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import config from '@utils/config';
import { AdminContainer, AdminBtn, ButtonGroupContainer } from './style';

interface Props {
  user: IAllUser;
  setSelectedIndex: (e: any) => void;
}

const AdminPageProfile: VFC<Props> = ({ user, setSelectedIndex }) => {
  const { id } = useParams<{ id: string }>();
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: channelUserList, mutate: mutateChannelUserList } = useSWR<IMemberList[]>(
    `/api/channels/userList/${id}`,
    fetcher,
  );

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
        mutateChannelUserList();
      })
      .catch(() => {});
  }, []);

  const onClickKickBtn = useCallback((e) => {
    e.preventDefault();
    axios
      .get(`/api/channels/ownerApi/siteOwnerChannelUserKick/${id}/${user.userId}`, config)
      .then((res) => {
        setSelectedIndex(-1);
        mutateChannelUserList();
      })
      .catch(() => {});
  }, []);

  const onClickBanBtn = useCallback((e) => {
    e.preventDefault();
    axios
      .get(`/api/channels/ownerApi/siteOwnerChannelUserBan/${id}/${user.userId}`, config)
      .then((res) => {
        setSelectedIndex(-1);
        mutateChannelUserList();
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
    <AdminContainer>
      <div className="header">
        <div className="header-wrapper">
          <Avatar className="avatar" src={user.profile} alt="Avatar" />
          <div className="user-text">{user.userId}</div>
          {userAuth !== 2 && (
            <AdminBtn
              onClick={onClickAppointAdmin}
              btnColor={`${userAuth === 1 ? '#f33c36' : '#002BC'}`}
              variant="text"
            >
              admin
            </AdminBtn>
          )}
        </div>
      </div>
      <ButtonGroupContainer>
        <div className="group-wrapper">
          <Link to={`/users/${user.userId}`}>
            <Button className="profile-btn" variant="text">
              profile
            </Button>
          </Link>
        </div>
        {userAuth === 0 && (
          <div>
            <Button onClick={onClickMuteBtn} className="feat-button" variant="text">
              mute
            </Button>
            <Button onClick={onClickKickBtn} className="feat-button" variant="text">
              kick
            </Button>
            <Button onClick={onClickBanBtn} className="feat-button" variant="text">
              ban
            </Button>
          </div>
        )}
      </ButtonGroupContainer>
    </AdminContainer>
  );
};

export default AdminPageProfile;
