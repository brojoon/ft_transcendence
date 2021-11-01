import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListDividers from '@components/UsersList';
import LeftDrawer from '@components/LeftDrawer';
import { Container } from './style';

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
          <Box style={{ height: '90vh' }}>
            <Typography>{children}</Typography>
          </Box>
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

export default function Social() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: any) => {
    setValue(index);
  };

  return (
    <Container>
      <LeftDrawer />
      <Box sx={{ bgcolor: '#1e1e1e', width: '100%', height: '100%' }}>
        <AppBar position="static" sx={{ bgcolor: '#1e1e1e', height: '10vh' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="🌐 ONLINE" {...a11yProps(0)} />
            <Tab label="👥 FRIENDS" {...a11yProps(1)} />
            <Tab label="🚨 BLOCKED" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          style={{ color: 'white' }}
        >
          <TabPanel value={value} index={0}>
            {/* <b style={{ fontSize: '10px', padding: '18px' }}>ONLINE — 0</b> */}
            <ListDividers />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ListDividers />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ListDividers />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </Container>
  );
}
