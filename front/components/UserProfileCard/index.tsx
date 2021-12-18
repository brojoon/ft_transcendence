import React, { useCallback, VFC, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import SettingsIcon from '@mui/icons-material/Settings';
import { useHistory, useParams } from 'react-router-dom';
import { IUser, IDmList } from '@typings/db';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import ChatIcon from '@mui/icons-material/Chat';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GamepadIcon from '@mui/icons-material/Gamepad';
import axios from 'axios';
import BasicModal from '@components/BasicModal';
import { FormatListBulleted } from '@mui/icons-material';
import config from '@utils/config';
import { UserProfileCardContainer, UserAvatar } from './style';
import { SocketContext } from '@store/socket';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Props {
  UserData: IUser;
}

const UserProfileCard: VFC<Props> = ({ UserData }) => {
  const { id } = useParams<{ id: string }>();
  const { data: dmList, mutate: mutateDmList } = useSWR<IDmList[]>('/api/dms/dmlist', fetcher);
  const { data: isFriend, mutate: mutateisFriend } = useSWR<boolean>(
    `/api/friend/checkfriend/${id}`,
    fetcher,
  );
  const { data: isBlock, mutate: mutateIsBlock } = useSWR<boolean>(
    `/api/friend/checkblock/${id}`,
    fetcher,
  );
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher);
  const history = useHistory();
  const [isAddFriendModal, setIsAddFriendModal] = useState(false);
  const [isRemoveFriendModal, setIsRemoveFriendModal] = useState(false);
  const [isBlockModal, setIsBlockModal] = useState(false);
  const [isRemoveBlockModal, setIsRemoveBlockModal] = useState(false);
  const { onlineList, onGameList } = useContext(SocketContext);
  let isState = 0;
  if (onGameList && onGameList[UserData?.userId]) isState = 2;
  if (isState === 0 && onlineList && UserData) {
    onlineList.map((onlineUser) => {
      if (onlineUser.userId === UserData.userId) isState = 1;
    });
  }

  const onClickChallengeBtn = useCallback((e) => {
    e.preventDefault();
    axios
      .post(`/api/dms/sendMessage/${UserData.userId}/1/0`, { message: '' }, config)
      .then((res) => {
        history.push(`/game/ping-pong/${res.data}`);
      });
  }, []);

  const onClickWatchBtn = useCallback((e) => {
    e.preventDefault();
    if (onGameList) history.push(`/game/ping-pong/${onGameList[UserData.userId]}`);
  }, []);

  const removeAllModals = useCallback(() => {
    setIsAddFriendModal(false);
    setIsBlockModal(false);
    setIsRemoveBlockModal(false);
    setIsRemoveFriendModal(false);
  }, []);

  const onToggleAddFriendModal = useCallback(
    (e) => {
      e.preventDefault();
      setIsAddFriendModal((prev) => !prev);
    },
    [isAddFriendModal, setIsAddFriendModal],
  );

  const onToggleRemoveFriendModal = useCallback(
    (e) => {
      e.preventDefault();
      setIsRemoveFriendModal((prev) => !prev);
    },
    [isRemoveFriendModal, setIsRemoveFriendModal],
  );

  const onToggleBlockModal = useCallback(
    (e) => {
      e.preventDefault();
      setIsBlockModal((prev) => !prev);
    },
    [isBlockModal, setIsBlockModal],
  );

  const onToggleRemoveBlockModal = useCallback(
    (e) => {
      e.preventDefault();
      setIsRemoveBlockModal((prev) => !prev);
    },
    [isRemoveBlockModal, setIsRemoveBlockModal],
  );

  const onClickAddFriendBtn = useCallback((e) => {
    e.preventDefault();
    axios
      .get(`/api/friend/addfriend/${UserData.userId}`, config)
      .then(() => {
        mutateisFriend();
        removeAllModals();
      })
      .catch(() => {});
  }, []);

  const onClickRemoveFriendBtn = useCallback((e) => {
    e.preventDefault();
    axios
      .get(`/api/friend/removefriend/${UserData.userId}`, config)
      .then(() => {
        mutateisFriend();
        removeAllModals();
      })
      .catch(() => {});
  }, []);

  const onClickAddBlockBtn = useCallback((e) => {
    e.preventDefault();
    axios
      .get(`/api/friend/addblock/${UserData.userId}`, config)
      .then(() => {
        mutateisFriend();
        mutateIsBlock();
        removeAllModals();
      })
      .catch(() => {});
  }, []);

  const onClickRemoveBlockBtn = useCallback((e) => {
    e.preventDefault();
    axios
      .get(`/api/friend/removeblock/${UserData.userId}`, config)
      .then(() => {
        mutateisFriend();
        mutateIsBlock();
        removeAllModals();
      })
      .catch(() => {});
  }, []);

  const onClickMessageBtn = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .get(`/api/dms/create/${UserData.userId}`, config)
        .then((res) => {
          mutateDmList();
          history.push(`/social/dm/${res.data}`);
        })
        .catch(() => {});
    },
    [UserData, mutateDmList, dmList],
  );

  return (
    <UserProfileCardContainer>
      {isAddFriendModal && (
        <BasicModal
          headerContent={`Add ${id}`}
          content={`Are you sure you want to add ${id} to your friends?`}
          NoBtn={onToggleAddFriendModal}
          YesBtn={onClickAddFriendBtn}
        />
      )}
      {isRemoveFriendModal && (
        <BasicModal
          headerContent={`Remove ${id}`}
          content={`Are you sure you want to permanently remove ${id} from your friends?`}
          NoBtn={onToggleRemoveFriendModal}
          YesBtn={onClickRemoveFriendBtn}
        />
      )}
      {isBlockModal && (
        <BasicModal
          headerContent={`Block ${id}`}
          content={`Are you sure you want to block ${id}? It will be removed from your friend list too.`}
          NoBtn={onToggleBlockModal}
          YesBtn={onClickAddBlockBtn}
        />
      )}
      {isRemoveBlockModal && (
        <BasicModal
          headerContent={`UnBlock ${id}`}
          content={`Are you sure you want to unblock ${id}?`}
          NoBtn={onToggleRemoveBlockModal}
          YesBtn={onClickRemoveBlockBtn}
        />
      )}

      <Card className="card-container" variant="outlined">
        <CardContent className="card-content">
          <UserAvatar
            isState={`${
              isState
                ? isState === 1
                  ? '2px solid #1ed14b'
                  : '2px solid #FFD400'
                : '2px solid #d63638'
            }`}
            src={UserData?.profile}
            alt="Avatar"
          />
          <Typography variant="h5" component="div">
            {UserData?.userId}
          </Typography>
          <span className="card-user-text">{UserData?.username}</span>
        </CardContent>
        <CardActions className="card-action">
          {isBlock ? (
            <Button className="challenge-block-btn" variant="contained" disabled>
              BLOCKED&nbsp;
              <GamepadIcon />
            </Button>
          ) : isState === 2 ? (
            <Button onClick={onClickWatchBtn} variant="contained" className="watch-btn">
              WATCH&nbsp;
              <VisibilityIcon />
            </Button>
          ) : (
            <Button onClick={onClickChallengeBtn} variant="contained" className="challenge-btn">
              CHALLENGE&nbsp;
              <GamepadIcon />
            </Button>
          )}
          {isBlock ? (
            <Button variant="contained" disabled className="friend-block-btn">
              BLOCKED&nbsp;
              <PersonAddAlt1Icon />
            </Button>
          ) : isFriend ? (
            <Button
              onClick={onToggleRemoveFriendModal}
              variant="contained"
              className="friend-unfriend-btn"
            >
              UNFRIEND&nbsp;
              <PersonAddAlt1Icon />
            </Button>
          ) : (
            <Button className="friend-btn" onClick={onToggleAddFriendModal} variant="contained">
              FRIEND&nbsp;
              <PersonAddAlt1Icon />
            </Button>
          )}
          {isBlock ? (
            <Button className="unblock-btn" onClick={onToggleRemoveBlockModal} variant="contained">
              UNBLOCK&nbsp;
              <PersonAddAlt1Icon />
            </Button>
          ) : (
            <Button className="block-btn" onClick={onToggleBlockModal} variant="contained">
              BLOCK&nbsp;
              <PersonOffIcon />
            </Button>
          )}
          {isBlock ? (
            <Button className="message-block-btn" variant="contained" disabled>
              BLOCKED&nbsp;
              <ChatIcon />
            </Button>
          ) : (
            <Button className="message-btn" onClick={onClickMessageBtn} variant="contained">
              MESSAGE&nbsp;
              <ChatIcon />
            </Button>
          )}
        </CardActions>
      </Card>
    </UserProfileCardContainer>
  );
};

export default UserProfileCard;
