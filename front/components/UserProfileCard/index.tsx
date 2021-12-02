import React, { useCallback, VFC, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import gravatar from 'gravatar';
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
import getToken from '@utils/getToken';
import BasicModal from '@components/BasicModal';
import { FormatListBulleted } from '@mui/icons-material';
import config from '@utils/config';

interface Props {
  UserData: IUser;
}

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

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
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const history = useHistory();
  const [isAddFriendModal, setIsAddFriendModal] = useState(false);
  const [isRemoveFriendModal, setIsRemoveFriendModal] = useState(false);
  const [isBlockModal, setIsBlockModal] = useState(false);
  const [isRemoveBlockModal, setIsRemoveBlockModal] = useState(false);

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
    <Box sx={{ width: '100%' }}>
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

      <Card
        variant="outlined"
        style={{
          backgroundColor: '#1e1e1e',
          color: 'white',
          border: '1px solid rgba(57, 57, 57, 0.5)',
          width: '100%',
          padding: '5px 10px 15px 10px',
        }}
      >
        <CardContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={UserData?.profile}
            alt="Avatar"
            style={{ width: '130px', height: '130px', marginBottom: '20px' }}
          />
          <Typography variant="h5" component="div">
            {UserData?.userId}
          </Typography>
          <span style={{ color: '#52575d', fontWeight: 500 }}>{UserData?.username}</span>
        </CardContent>
        <CardActions
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-betweens',
          }}
        >
          {isBlock ? (
            <Button
              variant="contained"
              disabled
              style={{
                width: '100%',
                height: '35px',
                backgroundColor: '#393939',
                borderColor: '#393939',
                fontWeight: 'bold',
              }}
            >
              BLOCKED&nbsp;
              <GamepadIcon />
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{
                width: '100%',
                height: '35px',
                backgroundColor: '#1678d1',
                borderColor: '#1678d1',
                fontWeight: 'bold',
              }}
            >
              CHALLENGE&nbsp;
              <GamepadIcon />
            </Button>
          )}
          {isBlock ? (
            <Button
              variant="contained"
              disabled
              style={{
                width: '100%',
                height: '35px',
                backgroundColor: '#393939',
                borderColor: '#393939',
                fontWeight: 'bold',
                margin: '20px 0 0 0',
              }}
            >
              BLOCKED&nbsp;
              <PersonAddAlt1Icon />
            </Button>
          ) : isFriend ? (
            <Button
              onClick={onToggleRemoveFriendModal}
              variant="contained"
              style={{
                width: '100%',
                height: '35px',
                backgroundColor: '#1e1e1e',
                border: '1px solid #3a3a3a',
                fontWeight: 'bold',
                margin: '20px 0 0 0',
                color: '#ec3f31',
              }}
            >
              UNFRIEND&nbsp;
              <PersonAddAlt1Icon />
            </Button>
          ) : (
            <Button
              onClick={onToggleAddFriendModal}
              variant="contained"
              style={{
                width: '100%',
                height: '35px',
                backgroundColor: '#5ebdff',
                borderColor: '#5ebdff',
                fontWeight: 'bold',
                margin: '20px 0 0 0',
              }}
            >
              FRIEND&nbsp;
              <PersonAddAlt1Icon />
            </Button>
          )}
          {isBlock ? (
            <Button
              onClick={onToggleRemoveBlockModal}
              variant="contained"
              style={{
                width: '100%',
                height: '35px',
                backgroundColor: 'red',
                borderColor: 'red',
                fontWeight: 'bold',
                margin: '20px 0 0 0',
              }}
            >
              UNBLOCK&nbsp;
              <PersonAddAlt1Icon />
            </Button>
          ) : (
            <Button
              onClick={onToggleBlockModal}
              variant="contained"
              style={{
                width: '100%',
                height: '35px',
                backgroundColor: 'red',
                borderColor: 'red',
                fontWeight: 'bold',
                margin: '20px 0 0 0',
              }}
            >
              BLOCK&nbsp;
              <PersonOffIcon />
            </Button>
          )}
          {isBlock ? (
            <Button
              variant="contained"
              disabled
              style={{
                width: '100%',
                height: '35px',
                backgroundColor: '#393939',
                borderColor: '#393939',
                fontWeight: 'bold',
                margin: '20px 0 0 0',
              }}
            >
              BLOCKED&nbsp;
              <ChatIcon />
            </Button>
          ) : (
            <Button
              onClick={onClickMessageBtn}
              variant="contained"
              style={{
                width: '100%',
                height: '35px',
                backgroundColor: '#9CFA24',
                borderColor: '#9CFA24',
                fontWeight: 'bold',
                margin: '20px 0 0 0',
              }}
            >
              MESSAGE&nbsp;
              <ChatIcon />
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default UserProfileCard;
