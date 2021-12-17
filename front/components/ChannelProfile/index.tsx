import React, { VFC, useCallback } from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { IAllUser, IMemberList, IUser, IDmList, IBlockList, IAchievement } from '@typings/db';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useParams, Link, useHistory } from 'react-router-dom';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import config from '@utils/config';
import { Container, AdminBtn, MatchDataContainer, ButtonGroupsContainer } from './style';

interface Props {
  user: IAllUser;
  setSelectedIndex: (e: any) => void;
}

const ChannelProfile: VFC<Props> = ({ user, setSelectedIndex }) => {
  const { id } = useParams<{ id: string }>();
  const { data: dmList, mutate: mutateDmList } = useSWR<IDmList[]>('/api/dms/dmlist', fetcher);
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: MymuteMmbers, mutate: mutateMymuteMmbers } = useSWR<IMemberList[]>(
    `/api/channels/mutedMembers/${id}`,
    fetcher,
  );
  const { data: blockList } = useSWR<IBlockList[]>(`/api/friend/blocklist`, fetcher);
  const { data: channelUserList, mutate: mutateChannelUserList } = useSWR<IMemberList[]>(
    `/api/channels/userList/${id}`,
    fetcher,
  );

  const { data: winCount } = useSWR<IAchievement>(
    `/api/game/achievement/numOfWin/${user.userId}`,
    fetcher,
  );
  const { data: loseCount } = useSWR<IAchievement>(
    `/api/game/achievement/numOfLose/${user.userId}`,
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
      .get(`/api/channels/muteUser/${id}/${user.userId}/20`, config)
      .then((res) => {
        mutateMymuteMmbers();
        setSelectedIndex(-1);
      })
      .catch(() => {
        mutateMymuteMmbers();
      });
  }, []);

  const onClickKickBtn = useCallback((e) => {
    e.preventDefault();
    axios
      .get(`/api/channels/kickUser/${id}/${user.userId}`, config)
      .then((res) => {
        setSelectedIndex(-1);
      })
      .catch(() => {});
  }, []);

  const onClickBanBtn = useCallback((e) => {
    e.preventDefault();
    axios
      .get(`/api/channels/banUser/${id}/${user.userId}`, config)
      .then((res) => {
        setSelectedIndex(-1);
      })
      .catch(() => {});
  }, []);

  const onClickMessageBtn = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .get(`/api/dms/create/${user.userId}`, config)
        .then((res) => {
          mutateDmList();
          history.push(`/social/dm/${res.data}`);
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
          .get(`/api/channels/giveAdmin/${id}/${user.userId}`, config)
          .then(() => {
            setSelectedIndex(-1);
            mutateChannelUserList();
          })
          .catch(() => {});
      } else if (userAuth === 1) {
        axios
          .get(`/api/channels/removeAdmin/${id}/${user.userId}`, config)
          .then(() => {
            setSelectedIndex(-1);
            mutateChannelUserList();
          })
          .catch(() => {});
      }
    },
    [myAuth],
  );
  return (
    <Container>
      <div className="header">
        <div className="header-wrapper">
          <Avatar className="avatar" src={user.profile} alt="Avatar" />
          <div className="user-text">{user.username}</div>
          {myAuth === 2 && userAuth !== 2 && (
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
      <MatchDataContainer>
        <div className="count-wrapper">
          <EmojiEventsIcon className="match-icon" />
          <div className="match-text">
            <span>Win Count</span>
            <span>{winCount?.number}</span>
          </div>
        </div>
        <div className="count-wrapper">
          <EventBusyIcon className="match-icon" />
          <div className="match-text">
            <span>Lose Count</span>
            <span>{loseCount?.number}</span>
          </div>
        </div>
      </MatchDataContainer>
      <ButtonGroupsContainer>
        <div className="profile-message-wrapper">
          <Link to={`/users/${user.userId}`}>
            <Button className="profile-btn" variant="text">
              profile
            </Button>
          </Link>
          {blockList?.map((blockedUser: IBlockList) => {
            if (blockedUser.userId2 === user.userId) isBlcok = true;
          })}
          {!isBlcok && (
            <Button className="message-btn" onClick={onClickMessageBtn} variant="text">
              message
            </Button>
          )}
        </div>
        {userAuth === 0 && (myAuth === 1 || myAuth === 2) && (
          <div>
            <Button onClick={onClickMuteBtn} className="mute-kick-ban-btn" variant="text">
              mute
            </Button>
            <Button onClick={onClickKickBtn} className="mute-kick-ban-btn" variant="text">
              kick
            </Button>
            <Button onClick={onClickBanBtn} className="mute-kick-ban-btn" variant="text">
              ban
            </Button>
          </div>
        )}
      </ButtonGroupsContainer>
    </Container>
  );
};

export default ChannelProfile;
