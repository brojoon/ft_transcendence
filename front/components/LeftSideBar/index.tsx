import React, { useCallback, useState } from 'react';
import { MyFab, NavIcons, StyledBadge, Toolbar, LeftSideBarContainer } from './style';
import ForumIcon from '@mui/icons-material/Forum';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import Tooltip from '@mui/material/Tooltip';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Scrollbars from 'react-custom-scrollbars';
import DashboardSharpIcon from '@mui/icons-material/DashboardSharp';
import config from '@utils/config';
const LeftSideBar = () => {
  const { data, mutate } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const history = useHistory();

  const handleListItemClick = (event: any, index: number) => {
    setSelectedIndex(index);
  };

  const onClickLogOut = useCallback(() => {
    axios
      .get('/api/auth/logout', config)
      .then(() => {
        history.push('/login');
      })
      .catch((error) => {
        if (error.response.data.code === 401) {
          history.push('/login');
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
    <LeftSideBarContainer>
      <Toolbar>
        <Scrollbars>
          <NavIcons>
            <Link to={`/profile`}>
              <Tooltip title="Profile" placement="right" arrow>
                <StyledBadge
                  className="sideBarProfileIcon"
                  onClick={(e) => {
                    handleListItemClick(e, -1);
                  }}
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar src={data?.profile} alt="Avatar" />
                </StyledBadge>
              </Tooltip>
            </Link>
            <div className="fab-wrapper"></div>
            <Link to={`/home`}>
              <Tooltip title="Home" placement="right" arrow>
                <MyFab
                  aria-label="add"
                  className="sideBarIcon"
                  selected={selectedIndex === 0}
                  onClick={(e) => {
                    handleListItemClick(e, 0);
                  }}
                >
                  <DashboardSharpIcon />
                </MyFab>
              </Tooltip>
            </Link>
            <Link to={`/social`}>
              <Tooltip title="Social" placement="right" arrow>
                <MyFab
                  aria-label="add"
                  className="sideBarIcon"
                  selected={selectedIndex === 1}
                  onClick={(e) => {
                    handleListItemClick(e, 1);
                  }}
                >
                  <ConnectWithoutContactIcon />
                </MyFab>
              </Tooltip>
            </Link>
            <Link to={`/channels`}>
              <Tooltip title="Channels" placement="right" arrow>
                <MyFab
                  aria-label="add"
                  className="sideBarIcon"
                  selected={selectedIndex === 2}
                  onClick={(e) => {
                    handleListItemClick(e, 2);
                  }}
                >
                  <ForumIcon />
                </MyFab>
              </Tooltip>
            </Link>
            <Link to={`/users`}>
              <Tooltip title="Users" placement="right" arrow>
                <MyFab
                  aria-label="add"
                  className="sideBarIcon"
                  selected={selectedIndex === 3}
                  onClick={(e) => {
                    handleListItemClick(e, 3);
                  }}
                >
                  <GroupIcon />
                </MyFab>
              </Tooltip>
            </Link>
            <Link to={`/achievements`}>
              <Tooltip title="Achievements" placement="right" arrow>
                <MyFab
                  aria-label="add"
                  className="sideBarIcon"
                  selected={selectedIndex === 4}
                  onClick={(e) => {
                    handleListItemClick(e, 4);
                  }}
                >
                  <MilitaryTechIcon />
                </MyFab>
              </Tooltip>
            </Link>
            <Link to={`/game`}>
              <Tooltip title="Game" placement="right" arrow>
                <MyFab
                  aria-label="add"
                  className="sideBarIcon"
                  selected={selectedIndex === 5}
                  onClick={(e) => {
                    handleListItemClick(e, 5);
                  }}
                >
                  <VideogameAssetIcon />
                </MyFab>
              </Tooltip>
            </Link>

            <Tooltip title="Logout" placement="right" arrow>
              <MyFab
                aria-label="add"
                className="sideBarIconLast"
                selected={selectedIndex === 6}
                onClick={onClickLogOut}
              >
                <LogoutIcon />
              </MyFab>
            </Tooltip>
          </NavIcons>
        </Scrollbars>
      </Toolbar>
    </LeftSideBarContainer>
  );
};

export default LeftSideBar;
