import React, { useCallback } from 'react';
import { MyFab, NavIcons, StyledBadge, Toolbar } from './style';
import ForumIcon from '@mui/icons-material/Forum';
import FlareIcon from '@mui/icons-material/Flare';
import GroupsIcon from '@mui/icons-material/Groups';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import gravatar from 'gravatar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';

const LeftSideBar = () => {
  const { data, mutate } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const onClickLogOut = useCallback(() => {
    let token = document.cookie.slice(document.cookie.indexOf('ts_token') + 9);
    token = token.indexOf(' ') === -1 ? token : token.slice(0, token.indexOf(' '));
    axios
      .get('/api/auth/logout', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        mutate();
      })
      .catch((error) => {
        if (error.response.data.code === 401) {
          window.location.href = '/ft_transcendence/login';
        } else {
          toast.error(error.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
        console.dir(error);
        console.log(error.code);
      });
  }, [document.cookie]);
  return (
    <div style={{ width: '55px' }}>
      <Toolbar>
        <NavIcons>
          <Link to={`/ft_transcendence/profile`}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar src={data?.profile} alt="Avatar" />
            </StyledBadge>
          </Link>
          <Link to={`/ft_transcendence/home`}>
            <MyFab aria-label="add" className="sideBarIcon">
              <HomeIcon />
            </MyFab>
          </Link>
          <Link to={`/ft_transcendence/social`}>
            <MyFab aria-label="add" className="sideBarIcon">
              <ConnectWithoutContactIcon />
            </MyFab>
          </Link>
          <Link to={`/ft_transcendence/channels`}>
            <MyFab aria-label="add" className="sideBarIcon">
              <ForumIcon />
            </MyFab>
          </Link>
          <Link to={`/ft_transcendence/users`}>
            <MyFab aria-label="add" className="sideBarIcon">
              <GroupsIcon />
            </MyFab>
          </Link>
          <Link to={`/ft_transcendence/achievements`}>
            <MyFab aria-label="add" className="sideBarIcon">
              <FlareIcon />
            </MyFab>
          </Link>
          <Link to={`/ft_transcendence/game`}>
            <MyFab aria-label="add" className="sideBarIcon">
              <VideogameAssetIcon />
            </MyFab>
          </Link>
          <Link to={`/ft_transcendence/login`}>
            <MyFab aria-label="add" className="sideBarIconLast" onClick={onClickLogOut}>
              <LogoutIcon />
            </MyFab>
          </Link>
        </NavIcons>
      </Toolbar>
    </div>
  );
};

export default LeftSideBar;
