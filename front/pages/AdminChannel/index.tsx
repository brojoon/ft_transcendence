import React, { useState, useCallback, useEffect, useContext } from 'react';
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
import { SocketContext } from '@store/socket';
import getSocket from '@utils/useSocket';
import { AdminChannelContainer } from './style';

import AdminPageProfile from '@components/AdminPageProfile';

const AdminChannel = () => {
  const { id } = useParams<{ id: string }>();
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher);

  const { data: MymuteMmbers, mutate: mutateMymuteMmbers } = useSWR<IMemberList[]>(
    `/api/channels/mutedMembers/${id === undefined ? -1 : id}`,
    fetcher,
  );
  const { data: memberList } = useSWR<IMemberList[]>(
    `/api/channels/userList/${id === undefined ? -1 : id}`,
    fetcher,
  );
  const { data: adminList, mutate: mutateAdminList } = useSWR<IAllUser[]>(
    '/api/users/listAdmin',
    fetcher,
  );
  const { data: alluserList, mutate: mutateAlluserList } = useSWR<IAllUser[]>(
    '/api/users/alluser',
    fetcher,
  );

  const { data: channelList, mutate: mutateChannelList } = useSWR<IChannelList2[]>(
    '/api/channels/ownerApi/siteOwnerChannelList',
    fetcher,
  );

  const [isChannelDeleteModal, setIsChannelDeleteModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const history = useHistory();

  const DeleteClickChannelBtn = useCallback(
    (e) => {
      e.preventDefault();
      axios.get(`/api/channels/ownerApi/siteOwnerChannelDelete/${id}`, config).then(() => {
        mutateChannelList().then(() => {
          history.push('/admin');
        });
      });
    },
    [id],
  );

  const onClickChannelDeleteModal = useCallback(
    (e) => {
      e.preventDefault();
      setIsChannelDeleteModal((prev) => !prev);
    },
    [isChannelDeleteModal],
  );

  const onClickMember = useCallback(
    (e, index) => {
      e.preventDefault();
      if (selectedIndex === index) {
        setSelectedIndex(-1);
      } else {
        console.log(index);
        setSelectedIndex(index);
      }
    },
    [selectedIndex],
  );

  return (
    <AdminChannelContainer>
      {isChannelDeleteModal && (
        <BasicModal
          NoBtn={onClickChannelDeleteModal}
          YesBtn={DeleteClickChannelBtn}
          headerContent="Delete Channel"
          content="This will remove the channel as well as all of its messages"
        />
      )}
      <div className="admin-page-header">
        <span className="header-span">Administrator</span>
      </div>
      <Scrollbars>
        <List className="tab-panel-4-list" component="nav" aria-label="mailbox folders">
          <Typography>
            <div>
              <ListItem className="tab-panel-4-list-item">Owner</ListItem>
              {memberList &&
                memberList?.map((member) => {
                  if (member.auth === 2) {
                    return alluserList?.map((user, index) => {
                      if (user.userId == member.userId) {
                        return (
                          <>
                            {selectedIndex === index && user.userId !== myData?.userId && (
                              <AdminPageProfile user={user} setSelectedIndex={setSelectedIndex} />
                            )}
                            <ListItem button onClick={(e) => onClickMember(e, index)}>
                              <Avatar
                                className="tab-panel-4-avatar"
                                src={user.profile}
                                alt="Avatar"
                              />
                              <ListItemText className="tab-pannel-4-text" primary={user.userId} />
                              <RecordVoiceOverIcon />
                            </ListItem>
                          </>
                        );
                      }
                    });
                  }
                })}
              <ListItem className="tab-panel-4-list-item">Admin</ListItem>
              {memberList &&
                memberList?.map((member) => {
                  if (member.auth === 1) {
                    return alluserList?.map((user, index) => {
                      if (user.userId == member.userId) {
                        return (
                          <>
                            {selectedIndex === index && user.userId !== myData?.userId && (
                              <AdminPageProfile user={user} setSelectedIndex={setSelectedIndex} />
                            )}
                            <ListItem button onClick={(e) => onClickMember(e, index)}>
                              <Avatar
                                className="tab-panel-4-avatar"
                                src={user.profile}
                                alt="Avatar"
                              />
                              <ListItemText className="tab-pannel-4-text" primary={user.userId} />
                              <RecordVoiceOverIcon />
                            </ListItem>
                          </>
                        );
                      }
                    });
                  }
                })}
              <ListItem className="tab-panel-4-list-item">Users</ListItem>
              {memberList &&
                memberList?.map((member) => {
                  if (member.auth === 0) {
                    return alluserList?.map((user, index) => {
                      if (user.userId == member.userId) {
                        let isMute = false;

                        return (
                          <>
                            {selectedIndex === index && user.userId !== myData?.userId && (
                              <AdminPageProfile user={user} setSelectedIndex={setSelectedIndex} />
                            )}
                            <ListItem button onClick={(e) => onClickMember(e, index)}>
                              <Avatar
                                className="tab-panel-4-avatar"
                                src={user.profile}
                                alt="Avatar"
                              />
                              <ListItemText className="tab-pannel-4-text" primary={user.userId} />
                              {member.mute ? (
                                <VoiceOverOffIcon className="mute-icon" />
                              ) : (
                                <RecordVoiceOverIcon />
                              )}
                            </ListItem>
                          </>
                        );
                      }
                    });
                  }
                })}
            </div>
            <div className="delete-channel-wrapper">
              <Button
                className="delete-btn"
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={onClickChannelDeleteModal}
              >
                DELETE CHANNEL
              </Button>
            </div>
          </Typography>
        </List>
      </Scrollbars>
    </AdminChannelContainer>
  );
};

export default AdminChannel;
