import React from 'react';
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

const LeftSideBar = () => {
  return (
    <Toolbar>
      <NavIcons>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar src={gravatar.url('brojoon', { s: '48px', d: 'retro' })} alt="Avatar" />
        </StyledBadge>

        <MyFab aria-label="add" className="sideBarIcon">
          <HomeIcon />
        </MyFab>
        <MyFab aria-label="add" className="sideBarIcon">
          <ForumIcon />
        </MyFab>
        <MyFab aria-label="add" className="sideBarIcon">
          <GroupsIcon />
        </MyFab>
        <MyFab aria-label="add" className="sideBarIcon">
          <FlareIcon />
        </MyFab>
        <MyFab aria-label="add" className="sideBarIcon">
          <VideogameAssetIcon />
        </MyFab>
        <MyFab aria-label="add" className="sideBarIconLast">
          <LogoutIcon />
        </MyFab>
      </NavIcons>
    </Toolbar>
  );
};

export default LeftSideBar;
