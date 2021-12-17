import React, { useContext } from 'react';
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
import { UserAvatar } from './style';
import { SocketContext } from '@store/socket';

export const TabPanel1 = () => {
  const { data: adminList, mutate: mutateAdminList } = useSWR<IAllUser[]>(
    '/api/users/listAdmin',
    fetcher,
  );
  const { onlineList, onGameList } = useContext(SocketContext);
  let isState;

  return (
    <Scrollbars>
      <List sx={{ width: '100%' }} component="nav" aria-label="mailbox folders">
        {adminList?.map((admin) => {
          isState = 0;
          if (onGameList && onGameList[admin.userId]) isState = 2;
          if (isState === 0) {
            onlineList?.map((onlineUser) => {
              if (onlineUser.userId === admin.userId) isState = 1;
            });
          }
          return (
            <ListItem button>
              <UserAvatar
                isState={`${
                  isState
                    ? isState === 1
                      ? '2px solid #1ed14b'
                      : '2px solid #FFD400'
                    : '2px solid #d63638'
                }`}
                src={admin.profile}
                alt="Avatar"
              />
              <ListItemText primary={admin.userId} style={{ marginLeft: '12px' }} />
            </ListItem>
          );
        })}
      </List>
    </Scrollbars>
  );
};

// export const TabPanel4 = () => {
//   <List className="tab-panel-4-list" component="nav" aria-label="mailbox folders">
//     {channelList?.map((channel) => {
//       return (
//         <Link to={`/admin/${channel.id}`}>
//           <Accordion>
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel1a-content"
//               id="panel1a-header"
//             >
//               <Typography>{channel.name}</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography>
//                 <div>
//                   <ListItem className="tab-panel-4-list-item">Owner</ListItem>
//                   {memberList &&
//                     memberList?.map((member) => {
//                       if (member.auth === 2) {
//                         return alluserList?.map((user, index) => {
//                           if (user.userId == member.userId) {
//                             return (
//                               <>
//                                 {selectedIndex === index && user.userId !== myData?.userId && (
//                                   <AdminPageProfile
//                                     user={user}
//                                     setSelectedIndex={setSelectedIndex}
//                                   />
//                                 )}
//                                 <ListItem button onClick={(e) => onClickMember(e, index)}>
//                                   <Avatar
//                                     className="tab-panel-4-avatar"
//                                     src={user.profile}
//                                     alt="Avatar"
//                                   />
//                                   <ListItemText
//                                     className="tab-pannel-4-text"
//                                     primary={user.userId}
//                                   />
//                                   <RecordVoiceOverIcon />
//                                 </ListItem>
//                               </>
//                             );
//                           }
//                         });
//                       }
//                     })}
//                   <ListItem className="tab-panel-4-list-item">Admin</ListItem>
//                   {memberList &&
//                     memberList?.map((member) => {
//                       if (member.auth === 1) {
//                         return alluserList?.map((user, index) => {
//                           if (user.userId == member.userId) {
//                             return (
//                               <>
//                                 {selectedIndex === index && user.userId !== myData?.userId && (
//                                   <AdminPageProfile
//                                     user={user}
//                                     setSelectedIndex={setSelectedIndex}
//                                   />
//                                 )}
//                                 <ListItem button onClick={(e) => onClickMember(e, index)}>
//                                   <Avatar
//                                     className="tab-panel-4-avatar"
//                                     src={user.profile}
//                                     alt="Avatar"
//                                   />
//                                   <ListItemText
//                                     className="tab-pannel-4-text"
//                                     primary={user.userId}
//                                   />
//                                   <RecordVoiceOverIcon />
//                                 </ListItem>
//                               </>
//                             );
//                           }
//                         });
//                       }
//                     })}
//                   <ListItem className="tab-panel-4-list-item">Users</ListItem>
//                   {memberList &&
//                     memberList?.map((member) => {
//                       if (member.auth === 0) {
//                         return alluserList?.map((user, index) => {
//                           if (user.userId == member.userId) {
//                             let isMute = false;

//                             return (
//                               <>
//                                 {selectedIndex === index && user.userId !== myData?.userId && (
//                                   <AdminPageProfile
//                                     user={user}
//                                     setSelectedIndex={setSelectedIndex}
//                                   />
//                                 )}
//                                 <ListItem button onClick={(e) => onClickMember(e, index)}>
//                                   <Avatar
//                                     className="tab-panel-4-avatar"
//                                     src={user.profile}
//                                     alt="Avatar"
//                                   />
//                                   <ListItemText
//                                     className="tab-pannel-4-text"
//                                     primary={user.userId}
//                                   />
//                                   {member.mute ? (
//                                     <VoiceOverOffIcon className="mute-icon" />
//                                   ) : (
//                                     <RecordVoiceOverIcon />
//                                   )}
//                                 </ListItem>
//                               </>
//                             );
//                           }
//                         });
//                       }
//                     })}
//                 </div>
//                 <div className="delete-channel-wrapper">
//                   <Button
//                     className="delete-btn"
//                     variant="contained"
//                     startIcon={<DeleteIcon />}
//                     onClick={onClickChannelDeleteModal}
//                   >
//                     DELETE CHANNEL
//                   </Button>
//                 </div>
//               </Typography>
//             </AccordionDetails>
//           </Accordion>
//         </Link>
//       );
//     })}
//   </List>;
// };
