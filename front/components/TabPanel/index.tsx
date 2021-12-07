import React from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IChannelList2, IAllUser, IUser, IMemberList } from '@typings/db';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Avatar from '@mui/material/Avatar';
import TabPanel from '@mui/lab/TabPanel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Scrollbars from 'react-custom-scrollbars';
import BasicModal from '@components/BasicModal';
import axios from 'axios';
import UserRightModal from '@components/UserRightModal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';
import { useParams, useHistory, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import config from '@utils/config';
import AdminPageProfile from '@components/AdminPageProfile';

export const TabPanel1 = () => {
  const { data: adminList, mutate: mutateAdminList } = useSWR<IAllUser[]>(
    '/api/users/listAdmin',
    fetcher,
  );

  return (
    <Scrollbars>
      <List sx={{ width: '100%' }} component="nav" aria-label="mailbox folders">
        {adminList?.map((admin) => {
          return (
            <ListItem button>
              <Avatar src={admin.profile} alt="Avatar" style={{ border: '2px solid red' }} />
              <ListItemText primary={admin.userId} style={{ marginLeft: '12px' }} />
            </ListItem>
          );
        })}
      </List>
    </Scrollbars>
  );
};
