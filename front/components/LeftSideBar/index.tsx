import React, { useCallback } from 'react';
import { MyFab, NavIcons, StyledBadge, Toolbar } from './style';
import ForumIcon from '@mui/icons-material/Forum';
import FlareIcon from '@mui/icons-material/Flare';
import GroupsIcon from '@mui/icons-material/Groups';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import gravatar from 'gravatar';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';

const LeftSideBar = () => {
  return (
    <div style={{ width: '10vh' }}>
      <Toolbar>
        <NavIcons>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar src={gravatar.url('brojoon', { s: '48px', d: 'retro' })} alt="Avatar" />
          </StyledBadge>
          <Link to={`/ft_transcendence/home`}>
            <MyFab aria-label="add" className="sideBarIcon">
              <HomeIcon />
            </MyFab>
          </Link>
          <Link to={`/ft_transcendence/channels`}>
            <MyFab aria-label="add" className="sideBarIcon">
              <ForumIcon />
            </MyFab>
          </Link>
          <Link to={`/ft_transcendence/friends`}>
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
          <Link to={`/login`}>
            <MyFab aria-label="add" className="sideBarIconLast">
              <LogoutIcon />
            </MyFab>
          </Link>
        </NavIcons>
      </Toolbar>
    </div>
  );
};

export default LeftSideBar;
