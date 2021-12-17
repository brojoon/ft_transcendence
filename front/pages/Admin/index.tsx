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

import AdminPageProfile from '@components/AdminPageProfile';
import { TabPanel1 } from '@components/TabPanel';
import { AdminPageContainer, AdminPageWrapper, TabPanelAatar } from './style';

const Admin = () => {
  const { id } = useParams<{ id: string }>();
  const { data: memberList } = useSWR<IMemberList[]>(
    `/api/channels/userList/${id === undefined ? -1 : id}`,
    fetcher,
  );
  const { data: alluserList, mutate: mutateAlluserList } = useSWR<IAllUser[]>(
    '/api/users/alluser',
    fetcher,
  );
  const { data: adminList, mutate: mutateAdminList } = useSWR<IAllUser[]>(
    '/api/users/listAdmin',
    fetcher,
  );
  const { data: banList, mutate: mutateBanList } = useSWR<IAllUser[]>(
    '/api/users/listBan',
    fetcher,
  );
  const { data: moderatorList, mutate: mutatemoderatorList } = useSWR<IAllUser[]>(
    '/api/users/listModerator',
    fetcher,
  );
  const { data: channelList, mutate: mutateChannelList } = useSWR<IChannelList2[]>(
    '/api/channels/ownerApi/siteOwnerChannelList',
    fetcher,
  );

  const { data: MymuteMmbers, mutate: mutateMymuteMmbers } = useSWR<IMemberList[]>(
    `/api/channels/mutedMembers/${id === undefined ? -1 : id}`,
    fetcher,
  );

  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher);

  const [value, setValue] = useState('1');
  const [isUnModeratorModal, setIsUnModeratorModal] = useState(false);
  const [isUnBanUserModal, setIsUnBanUserModal] = useState(false);
  const [unModeratorSelected, setUnModeratorSelected] = useState('');
  const [unBanUserSelected, setUnBanUserSelected] = useState('');
  const [isUserPrivilegeModal, setIsUserPrivilegeModal] = useState(false);
  const [userPrivilegeSelected, setUserPrivilegeSelected] = useState('');

  const { data: DMList } = useSWR<number[]>('/api/dms/dmlistOnlyIdJustArray', fetcher);
  const { data: ChannelList } = useSWR<number[]>('/api/channels/myChannelListOnlyId', fetcher);
  const { onlineList, setOnlineList, onGameList, setOnGameList } = useContext(SocketContext);
  let isState;

  const socket = getSocket();

  useEffect(() => {
    if (DMList && ChannelList && myData) {
      socket.emit('login', {
        userId: myData.userId,
        username: myData.username,
        Dms: DMList,
        channels: ChannelList,
      });
    }
  }, [socket, DMList, ChannelList, myData]);

  useEffect(() => {
    socket?.on('onGameList', (data: any) => {
      setOnGameList(data);
      console.log(data);
      console.log('onGameList !!!');
    });
    return () => {
      socket.off('onGameList');
    };
  }, [socket]);

  useEffect(() => {
    socket?.on('onlineList', (data: any) => {
      setOnlineList(data);
      console.log(data);
      console.log('onlineList !!!');
    });

    return () => {
      socket.off('onlineList');
    };
  }, [socket]);

  useEffect(() => {
    if (adminList !== undefined && moderatorList !== undefined && myData !== undefined) {
      let isUnauthorized = true;
      for (let admin of adminList) {
        if (myData?.userId === admin.userId) {
          isUnauthorized = false;
        }
      }

      if (isUnauthorized) {
        for (let moderator of moderatorList) {
          if (myData?.userId === moderator.userId) {
            isUnauthorized = false;
          }
        }
      }

      if (isUnauthorized) {
        const history = useHistory();
        history.push('/home');
      }
    }
  }, [adminList, moderatorList, myData]);

  const onClickUserPrivilege = useCallback(
    (e, userId) => {
      setUserPrivilegeSelected(userId);
      setIsUserPrivilegeModal(true);
    },
    [isUserPrivilegeModal, userPrivilegeSelected],
  );

  const onCloseUserPrivilegeModal = useCallback(
    (e) => {
      e.preventDefault();
      setIsUserPrivilegeModal(false);
    },
    [isUnModeratorModal],
  );

  const onClickUnModerator = useCallback(
    (e, userId) => {
      let isAdmin = false;
      adminList?.map((admin) => {
        if (admin.userId === myData?.userId) isAdmin = true;
      });
      if (isAdmin) {
        setUnModeratorSelected(userId);
        setIsUnModeratorModal(true);
      }
    },
    [unModeratorSelected, adminList, myData],
  );
  const onCloseUnModeratorModal = useCallback(
    (e) => {
      e.preventDefault();
      setIsUnModeratorModal(false);
    },
    [isUnModeratorModal],
  );

  const onClickUnBanUser = useCallback(
    (e, userId) => {
      setUnBanUserSelected(userId);
      setIsUnBanUserModal(true);
    },
    [unModeratorSelected],
  );

  const onCloseUnBanUserModal = useCallback(
    (e) => {
      e.preventDefault();
      setIsUnBanUserModal(false);
    },
    [isUnBanUserModal],
  );

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  const onSubmitModerator = useCallback(
    (e) => {
      e.preventDefault();
      let isAdmin = false;
      adminList?.map((admin) => {
        if (admin.userId === myData?.userId) isAdmin = true;
      });

      if (isAdmin) {
        if (userPrivilegeSelected) {
          axios
            .get(`/api/users/addModerator/${userPrivilegeSelected}`, config)
            .then(() => {
              mutatemoderatorList();
              mutateAlluserList();
              setIsUserPrivilegeModal(false);
              setUserPrivilegeSelected('');
            })
            .catch(() => {});
        }
      }
    },
    [userPrivilegeSelected, adminList, myData],
  );

  const onSubmitUnModerator = useCallback(
    (e) => {
      e.preventDefault();
      if (unModeratorSelected) {
        axios
          .get(`/api/users/removeModerator/${unModeratorSelected}`, config)
          .then(() => {
            mutatemoderatorList();
            mutateAlluserList();
            setIsUnModeratorModal(false);
            setUnModeratorSelected('');
          })
          .catch(() => {});
      }
    },
    [unModeratorSelected],
  );

  const onSubmitBan = useCallback(
    (e) => {
      e.preventDefault();
      if (userPrivilegeSelected) {
        axios
          .get(`/api/users/addBan/${userPrivilegeSelected}`, config)
          .then(() => {
            mutateBanList();
            mutateAlluserList();
            setIsUserPrivilegeModal(false);
            setUserPrivilegeSelected('');
          })
          .catch(() => {});
      }
    },
    [userPrivilegeSelected],
  );

  const onSubmitUnBanUser = useCallback(
    (e) => {
      e.preventDefault();
      if (unBanUserSelected) {
        axios
          .get(`/api/users/removeBan/${unBanUserSelected}`, config)
          .then(() => {
            mutateBanList();
            mutateAlluserList();
            setIsUnBanUserModal(false);
            setUnBanUserSelected('');
          })
          .catch(() => {});
      }
    },
    [unBanUserSelected],
  );

  return (
    <AdminPageContainer>
      {isUnModeratorModal && (
        <BasicModal
          headerContent="Remove from moderator list"
          content="Are you sure you want to remove this user from the moderator list?"
          NoBtn={onCloseUnModeratorModal}
          YesBtn={onSubmitUnModerator}
        />
      )}
      {isUnBanUserModal && (
        <BasicModal
          headerContent="Remove from ban list"
          content="Are you sure you want to remove this user from the ban list?"
          NoBtn={onCloseUnBanUserModal}
          YesBtn={onSubmitUnBanUser}
        />
      )}
      {isUserPrivilegeModal && (
        <UserRightModal
          headerContent="Assign user privilege"
          content="You can add you to the list of moderator or ban"
          NoBtn={onCloseUserPrivilegeModal}
          ModerateBtn={onSubmitModerator}
          BanBtn={onSubmitBan}
        />
      )}
      <div className="admin-page-header">
        <span className="header-span">Administrator</span>
      </div>
      <AdminPageWrapper sx={{ typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="AdminList" value="1" />
              <Tab label="ModeratorList" value="2" />
              <Tab label="UserList" value="3" />
              <Tab label="ChannelList" value="4" />
              <Tab label="BanList" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TabPanel1 />
          </TabPanel>
          <TabPanel value="2">
            <Scrollbars>
              <List className="tab-panel-2-list" component="nav" aria-label="mailbox folders">
                {moderatorList?.map((moderator) => {
                  isState = 0;
                  if (onGameList && onGameList[moderator.userId]) isState = 2;
                  if (isState === 0) {
                    onlineList?.map((onlineUser) => {
                      if (onlineUser.userId === moderator.userId) isState = 1;
                    });
                  }
                  return (
                    <ListItem
                      button
                      onClick={(e) => {
                        onClickUnModerator(e, moderator.userId);
                      }}
                    >
                      <TabPanelAatar
                        isState={`${
                          isState
                            ? isState === 1
                              ? '2px solid #1ed14b'
                              : '2px solid #FFD400'
                            : '2px solid #d63638'
                        }`}
                        src={moderator.profile}
                        alt="Avatar"
                      />
                      <ListItemText className="tab-panel-2-text" primary={moderator.userId} />
                    </ListItem>
                  );
                })}
              </List>
            </Scrollbars>
          </TabPanel>
          <TabPanel value="3">
            <Scrollbars>
              <List className="tab-panel-3-list" component="nav" aria-label="mailbox folders">
                {alluserList?.map((user) => {
                  let visibility = true;
                  banList?.map((banedUser) => {
                    if (banedUser.userId === user.userId) visibility = false;
                  });
                  adminList?.map((admin) => {
                    if (admin.userId === user.userId) visibility = false;
                  });
                  moderatorList?.map((moderator) => {
                    if (moderator.userId === user.userId) visibility = false;
                  });

                  if (visibility) {
                    isState = 0;
                    if (onGameList && onGameList[user.userId]) isState = 2;
                    if (isState === 0) {
                      onlineList?.map((onlineUser) => {
                        if (onlineUser.userId === user.userId) isState = 1;
                      });
                    }
                    return (
                      <ListItem
                        button
                        onClick={(e) => {
                          onClickUserPrivilege(e, user.userId);
                        }}
                      >
                        <TabPanelAatar
                          isState={`${
                            isState
                              ? isState === 1
                                ? '2px solid #1ed14b'
                                : '2px solid #FFD400'
                              : '2px solid #d63638'
                          }`}
                          src={user.profile}
                          alt="Avatar"
                        />
                        <ListItemText className="tab-panel-3-text" primary={user.userId} />
                      </ListItem>
                    );
                  }
                })}
              </List>
            </Scrollbars>
          </TabPanel>
          <TabPanel value="4">
            <Scrollbars>
              <List className="tab-panel-4-list" component="nav" aria-label="mailbox folders">
                {channelList?.map((channel) => {
                  return (
                    <Link to={`/admin/${channel.id}`}>
                      <ListItem button>
                        <Typography>{channel.name}</Typography>
                      </ListItem>
                    </Link>
                  );
                })}
              </List>
            </Scrollbars>
          </TabPanel>
          <TabPanel value="5">
            <Scrollbars>
              <List className="tab-panel-5-list" component="nav" aria-label="mailbox folders">
                {banList?.map((banedUser) => {
                  return (
                    <ListItem
                      button
                      onClick={(e) => {
                        onClickUnBanUser(e, banedUser.userId);
                      }}
                    >
                      <Avatar src={banedUser.profile} alt="Avatar" />
                      <ListItemText className="tab-panel-5-text" primary={banedUser.userId} />
                    </ListItem>
                  );
                })}
              </List>
            </Scrollbars>
          </TabPanel>
        </TabContext>
      </AdminPageWrapper>
    </AdminPageContainer>
  );
};

export default Admin;
