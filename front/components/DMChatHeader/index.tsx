import React, { useCallback, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IAllUser, IUser } from '@typings/db';
import { useParams } from 'react-router-dom';
import GamepadIcon from '@mui/icons-material/Gamepad';
import axios from 'axios';
import config from '@utils/config';
import { useHistory } from 'react-router-dom';
import { DMChatHeaderContainer } from './style';
import { toast } from 'react-toastify';
import { SocketContext } from '@store/socket';
import VisibilityIcon from '@mui/icons-material/Visibility';

const DMChatHeader = () => {
  const { id } = useParams<{ id: string }>();
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher);
  const { data: userId } = useSWR<string>(`/api/dms/findDmUser/${id}`, fetcher);
  const { data: alluser } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);
  const { onlineList, onGameList } = useContext(SocketContext);
  const history = useHistory();
  let isState = 0;

  if (onGameList && userId && onGameList[userId]) isState = 2;

  const onClickChallengeBtn = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(`/api/dms/sendMessage/${userId}/3/0`, { message: '' }, config)
        .then((res) => {
          history.push(`/game/ping-pong/${res.data}`);
        })
        .catch((error) => {
          if (error.response.data.data.message === 'Block 상태') {
            toast.error('Cant challenge because you are blocked', {
              autoClose: 4000,
              position: toast.POSITION.TOP_RIGHT,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              theme: 'colored',
            });
          } else {
            toast.error(error.message, {
              autoClose: 4000,
              position: toast.POSITION.TOP_RIGHT,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              theme: 'colored',
            });
          }
        });
    },
    [userId, alluser],
  );

  const onClickWatchBtn = useCallback(
    (e) => {
      e.preventDefault();
      if (onGameList && userId) history.push(`/game/ping-pong/${onGameList[userId]}`);
    },
    [onGameList],
  );

  return (
    <DMChatHeaderContainer>
      <AppBar className="wrapper">
        <Toolbar>
          <Typography variant="h6" component="span" className="user-profile-container">
            {alluser?.map((user) => {
              if (user.userId == userId) {
                return (
                  <div className="user-profile-wrapper" key={userId}>
                    <Avatar className="avatar" src={user.profile} alt="Avatar" />
                    <span>{user.username}</span>
                  </div>
                );
              }
            })}
          </Typography>
          {isState === 2 && onGameList && myData && onGameList[myData?.userId] === undefined ? (
            <Button onClick={onClickWatchBtn} variant="contained" className="watch-btn">
              WATCH&nbsp;
              <VisibilityIcon />
            </Button>
          ) : onGameList && myData && onGameList[myData?.userId] ? (
            <Button className="challenge-block-btn" onClick={onClickChallengeBtn} disabled>
              CHALLENGE&nbsp;
              <GamepadIcon />
            </Button>
          ) : (
            <Button className="challenge-btn" onClick={onClickChallengeBtn}>
              CHALLENGE&nbsp;
              <GamepadIcon />
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </DMChatHeaderContainer>
  );
};

export default DMChatHeader;
