import React, { useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IAllUser } from '@typings/db';
import { useParams } from 'react-router-dom';
import GamepadIcon from '@mui/icons-material/Gamepad';
import axios from 'axios';
import config from '@utils/config';
import { useHistory } from 'react-router-dom';
import { DMChatHeaderContainer } from './style';
import { toast } from 'react-toastify';

const DMChatHeader = () => {
  const { id } = useParams<{ id: string }>();
  const { data: userId } = useSWR<string>(`/api/dms/findDmUser/${id}`, fetcher);
  const { data: alluser } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);

  const history = useHistory();

  const onClickChallengeBtn = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(`/api/dms/sendMessage/${userId}/1/0`, { message: '' }, config)
        .then((res) => {
          history.push(`/game/ping-pong/${res.data}`);
        })
        .catch((error) => {
          toast.error(error.message, {
            autoClose: 4000,
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
          });
        });
    },
    [userId, alluser],
  );

  return (
    <DMChatHeaderContainer>
      <AppBar className="wrapper">
        <Toolbar>
          <Typography variant="h6" component="span" className="user-profile-container">
            {alluser?.map((user) => {
              if (user.userId === userId)
                return (
                  <div className="user-profile-wrapper" key={userId}>
                    <Avatar className="avatar" src={user.profile} alt="Avatar" />
                    <span>{user.username}</span>
                  </div>
                );
            })}
          </Typography>
          <Button className="challenge-btn" onClick={onClickChallengeBtn}>
            CHALLENGE&nbsp;
            <GamepadIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </DMChatHeaderContainer>
  );
};

export default DMChatHeader;
