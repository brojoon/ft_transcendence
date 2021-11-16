import React, { useCallback } from 'react';
import { MyFab, NavIcons, StyledBadge, Toolbar } from './style';
import ForumIcon from '@mui/icons-material/Forum';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import getToken from '@utils/getToken';
import Tooltip from '@mui/material/Tooltip';

const LeftSideBar = () => {
  const { data, mutate } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const onClickLogOut = useCallback(() => {
    axios
      .get('/api/auth/logout', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${getToken()}`,
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
    <div style={{ width: '55px', flexShrink: 0 }}>
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
            <Tooltip title="Home" placement="right" arrow>
              <MyFab aria-label="add" className="sideBarIcon">
                <HomeIcon />
              </MyFab>
            </Tooltip>
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
              <GroupIcon />
            </MyFab>
          </Link>
          <Link to={`/ft_transcendence/achievements`}>
            <MyFab aria-label="add" className="sideBarIcon">
              <EqualizerIcon />
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
