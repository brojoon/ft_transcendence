import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import FriendsList from '@components/FriendsList';
import FriendsOnlineList from '@components/FriendsOnlineList';
import { IFriendList, IAllUser } from '@typings/db';
import BlockList from '@components/BlockList';
import { SocialSliderContainer, TabPannelBox } from './style';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <TabPannelBox>
            <Typography>{children}</Typography>
          </TabPannelBox>
        )}
      </div>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const SocialSlider = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = useCallback((event: any, newValue: any) => {
    setValue(newValue);
  }, []);

  const handleChangeIndex = useCallback((index: any) => {
    setValue(index);
  }, []);

  return (
    <SocialSliderContainer>
      <AppBar position="static" className="app-bar">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="🌐 ONLINE" {...a11yProps(0)}></Tab>
          <Tab label="👥 FRIENDS" {...a11yProps(1)} />
          <Tab label="🚨 BLOCKED" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        className="swipeable-views "
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          <FriendsOnlineList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FriendsList />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <BlockList />
        </TabPanel>
      </SwipeableViews>
    </SocialSliderContainer>
  );
};

export default SocialSlider;
