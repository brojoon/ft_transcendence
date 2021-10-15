import React from 'react';
import { MyFab, NavIcons, StyledBadge, Toolbar } from './style';
import ForumIcon from '@mui/icons-material/Forum';
import FlareIcon from '@mui/icons-material/Flare';
import GroupsIcon from '@mui/icons-material/Groups';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

const LeftSideBar = () => {
  return (
    <Toolbar>
      <NavIcons>
        <StyledBadge />
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
