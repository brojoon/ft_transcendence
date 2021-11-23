import React, { useCallback, useState } from 'react';
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
import getToken from '@utils/getToken';
import Tooltip from '@mui/material/Tooltip';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import DashboardSharpIcon from '@mui/icons-material/DashboardSharp';

const LeftSideBar = () => {
  const { data, mutate } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event: any, index: number) => {
    setSelectedIndex(index);
  };

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
    <div style={{ width: '55px', flexShrink: 0, borderRight: '5px solid #121212' }}>
      <Toolbar>
        <NavIcons>
          <Link to={`/ft_transcendence/profile`}>
            <Tooltip title="Profile" placement="right" arrow>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar src={data?.profile} alt="Avatar" />
              </StyledBadge>
            </Tooltip>
          </Link>
          <div
            style={{ backgroundColor: '#4d4d4d', marginTop: '8px', width: '30px', height: '1px' }}
          ></div>
          <Link to={`/ft_transcendence/home`}>
            <Tooltip title="Home" placement="right" arrow>
              <MyFab aria-label="add" className="sideBarIcon">
                <DashboardSharpIcon />
              </MyFab>
            </Tooltip>
          </Link>
          <Link to={`/ft_transcendence/social`}>
            <Tooltip title="Social" placement="right" arrow>
              <MyFab aria-label="add" className="sideBarIcon">
                <ConnectWithoutContactIcon />
              </MyFab>
            </Tooltip>
          </Link>
          <Link to={`/ft_transcendence/channels`}>
            <Tooltip title="Channels" placement="right" arrow>
              <MyFab aria-label="add" className="sideBarIcon">
                <ForumIcon />
              </MyFab>
            </Tooltip>
          </Link>
          <Link to={`/ft_transcendence/users`}>
            <Tooltip title="Users" placement="right" arrow>
              <MyFab aria-label="add" className="sideBarIcon">
                <GroupIcon />
              </MyFab>
            </Tooltip>
          </Link>
          <Link to={`/ft_transcendence/achievements`}>
            <Tooltip title="Achievements" placement="right" arrow>
              <MyFab aria-label="add" className="sideBarIcon">
                <MilitaryTechIcon />
              </MyFab>
            </Tooltip>
          </Link>
          <Link to={`/ft_transcendence/game`}>
            <Tooltip title="Game" placement="right" arrow>
              <MyFab aria-label="add" className="sideBarIcon">
                <VideogameAssetIcon />
              </MyFab>
            </Tooltip>
          </Link>
          <Link to={`/ft_transcendence/login`}>
            <Tooltip title="Logout" placement="right" arrow>
              <MyFab aria-label="add" className="sideBarIconLast" onClick={onClickLogOut}>
                <LogoutIcon />
              </MyFab>
            </Tooltip>
          </Link>
        </NavIcons>
      </Toolbar>
    </div>
  );
};

export default LeftSideBar;
