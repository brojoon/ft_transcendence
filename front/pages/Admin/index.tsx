import React, { useState, useCallback } from 'react';
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
import getToken from '@utils/getToken';
import UserRightModal from '@components/UserRightModal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';
import { useParams, useHistory } from 'react-router-dom';

import ChannelProfile from '@components/ChannelProfile';

const Admin = () => {
  const { id } = useParams<{ id: string }>();
  const { data: memberList } = useSWR<IMemberList[]>(`/api/channels/userList/${id}`, fetcher);
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
    `/api/channels/mutedMembers/${id}`,
    fetcher,
  );

  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher);

  const [value, setValue] = useState('1');
  const [isUnModeratorModal, setIsUnModeratorModal] = useState(false);
  const [UnModeratorSelected, setUnModeratorSelected] = useState('');
  const [isUnBanUserModal, setIsUnBanUserModal] = useState(false);
  const [UnBanUserSelected, setUnBanUserSelected] = useState('');
  const [isUserPrivilegeModal, setIsUserPrivilegeModal] = useState(false);
  const [userPrivilegeSelected, setUserPrivilegeSelected] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const onClickUserPrivilege = useCallback(
    (e, userId) => {
      setUserPrivilegeSelected(userId);
      setIsUserPrivilegeModal(true);
    },
    [UnModeratorSelected],
  );

  const onClickMember = useCallback(
    (e, index) => {
      e.preventDefault();
      if (selectedIndex === index) {
        setSelectedIndex(-1);
      } else {
        setSelectedIndex(index);
      }
    },
    [selectedIndex],
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
    [UnModeratorSelected, adminList, myData],
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
    [UnModeratorSelected],
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
            .get(`/api/users/addModerator/${userPrivilegeSelected}`, {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            })
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
      if (UnModeratorSelected) {
        axios
          .get(`/api/users/removeModerator/${UnModeratorSelected}`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          })
          .then(() => {
            mutatemoderatorList();
            mutateAlluserList();
            setIsUnModeratorModal(false);
            setUnModeratorSelected('');
          })
          .catch(() => {});
      }
    },
    [UnModeratorSelected],
  );

  const onSubmitBan = useCallback(
    (e) => {
      e.preventDefault();
      if (userPrivilegeSelected) {
        axios
          .get(`/api/users/addBan/${userPrivilegeSelected}`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          })
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
      if (UnBanUserSelected) {
        axios
          .get(`/api/users/removeBan/${UnBanUserSelected}`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          })
          .then(() => {
            mutateBanList();
            mutateAlluserList();
            setIsUnBanUserModal(false);
            setUnBanUserSelected('');
          })
          .catch(() => {});
      }
    },
    [UnBanUserSelected],
  );

  return (
    <div style={{ backgroundColor: 'white', height: '100%' }}>
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
      <div
        style={{
          backgroundColor: '#d3d3d3',
          height: '70px',
          fontWeight: 700,
          fontSize: '30px',
          lineHeight: '65px',
          boxShadow:
            'rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px',
        }}
      >
        <span style={{ marginLeft: '50px' }}>Administrator</span>
      </div>
      <Box
        sx={{ width: '100%', height: 'calc(100% - 180px)', typography: 'body1', marginTop: '10px' }}
      >
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
            <Scrollbars>
              <List sx={{ width: '100%' }} component="nav" aria-label="mailbox folders">
                {adminList?.map((admin) => {
                  return (
                    <ListItem button>
                      <Avatar
                        src={admin.profile}
                        alt="Avatar"
                        style={{ border: '2px solid red' }}
                      />
                      <ListItemText primary={admin.userId} style={{ marginLeft: '12px' }} />
                    </ListItem>
                  );
                })}
              </List>
            </Scrollbars>
          </TabPanel>
          <TabPanel value="2">
            <Scrollbars>
              <List sx={{ width: '100%' }} component="nav" aria-label="mailbox folders">
                {moderatorList?.map((moderator) => {
                  return (
                    <ListItem
                      button
                      onClick={(e) => {
                        onClickUnModerator(e, moderator.userId);
                      }}
                    >
                      <Avatar
                        src={moderator.profile}
                        alt="Avatar"
                        style={{ border: '2px solid red' }}
                      />
                      <ListItemText primary={moderator.userId} style={{ marginLeft: '12px' }} />
                    </ListItem>
                  );
                })}
              </List>
            </Scrollbars>
          </TabPanel>
          <TabPanel value="3">
            <Scrollbars>
              <List sx={{ width: '100%' }} component="nav" aria-label="mailbox folders">
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
                    return (
                      <ListItem
                        button
                        onClick={(e) => {
                          onClickUserPrivilege(e, user.userId);
                        }}
                      >
                        <Avatar
                          src={user.profile}
                          alt="Avatar"
                          style={{ border: '2px solid red' }}
                        />
                        <ListItemText primary={user.userId} style={{ marginLeft: '12px' }} />
                      </ListItem>
                    );
                  }
                })}
              </List>
            </Scrollbars>
          </TabPanel>
          <TabPanel value="4">
            <Scrollbars>
              <List sx={{ width: '100%' }} component="nav" aria-label="mailbox folders">
                {channelList?.map((channel) => {
                  return (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{channel.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <div>
                            <ListItem
                              style={{ fontSize: '16px', marginTop: '11px', color: 'gray' }}
                            >
                              Owner
                            </ListItem>
                            {memberList &&
                              memberList?.map((member) => {
                                if (member.auth === 2) {
                                  return alluserList?.map((user, index) => {
                                    if (user.userId == member.userId) {
                                      return (
                                        <>
                                          {selectedIndex === index &&
                                            user.userId !== myData?.userId && (
                                              <ChannelProfile user={user} />
                                            )}
                                          <ListItem button onClick={(e) => onClickMember(e, index)}>
                                            <Avatar
                                              src={user.profile}
                                              alt="Avatar"
                                              style={{
                                                border: '2px solid red',
                                                width: '38px',
                                                height: '38px',
                                              }}
                                            />
                                            <ListItemText
                                              primary={user.userId}
                                              style={{ marginLeft: '12px', color: 'white' }}
                                            />
                                            <RecordVoiceOverIcon style={{ color: 'white' }} />
                                          </ListItem>
                                        </>
                                      );
                                    }
                                  });
                                }
                              })}
                            <ListItem
                              style={{ fontSize: '16px', marginTop: '11px', color: 'gray' }}
                            >
                              Admin
                            </ListItem>
                            {memberList &&
                              memberList?.map((member) => {
                                if (member.auth === 1) {
                                  return alluserList?.map((user, index) => {
                                    if (user.userId == member.userId) {
                                      return (
                                        <>
                                          {selectedIndex === index &&
                                            user.userId !== myData?.userId && (
                                              <ChannelProfile user={user} />
                                            )}
                                          <ListItem button onClick={(e) => onClickMember(e, index)}>
                                            <Avatar
                                              src={user.profile}
                                              alt="Avatar"
                                              style={{
                                                border: '2px solid red',
                                                width: '38px',
                                                height: '38px',
                                              }}
                                            />
                                            <ListItemText
                                              primary={user.userId}
                                              style={{ marginLeft: '12px', color: 'white' }}
                                            />
                                            <RecordVoiceOverIcon style={{ color: 'white' }} />
                                          </ListItem>
                                        </>
                                      );
                                    }
                                  });
                                }
                              })}
                            <ListItem
                              style={{ fontSize: '16px', marginTop: '11px', color: 'gray' }}
                            >
                              Users
                            </ListItem>
                            {memberList &&
                              memberList?.map((member, index) => {
                                if (member.auth === 0) {
                                  return alluserList?.map((user) => {
                                    if (user.userId == member.userId) {
                                      if (MymuteMmbers && MymuteMmbers.length > 0) {
                                        return MymuteMmbers?.map((muteMember: IMemberList) => {
                                          if (muteMember.userId === user.userId) {
                                            if (muteMember.mute) {
                                              return (
                                                <>
                                                  {selectedIndex === index &&
                                                    user.userId !== myData?.userId && (
                                                      <ChannelProfile user={user} />
                                                    )}
                                                  <ListItem
                                                    button
                                                    onClick={(e) => onClickMember(e, index)}
                                                  >
                                                    <Avatar
                                                      src={user.profile}
                                                      alt="Avatar"
                                                      style={{
                                                        border: '2px solid red',
                                                        width: '38px',
                                                        height: '38px',
                                                      }}
                                                    />
                                                    <ListItemText
                                                      primary={user.userId}
                                                      style={{ marginLeft: '12px', color: 'white' }}
                                                    />
                                                    <VoiceOverOffIcon style={{ color: 'red' }} />
                                                  </ListItem>
                                                </>
                                              );
                                            }
                                          }
                                        });
                                      } else {
                                        return (
                                          <>
                                            {selectedIndex === index &&
                                              user.userId !== myData?.userId && (
                                                <ChannelProfile user={user} />
                                              )}
                                            <ListItem
                                              button
                                              onClick={(e) => onClickMember(e, index)}
                                            >
                                              <Avatar
                                                src={user.profile}
                                                alt="Avatar"
                                                style={{
                                                  border: '2px solid red',
                                                  width: '38px',
                                                  height: '38px',
                                                }}
                                              />
                                              <ListItemText
                                                primary={user.userId}
                                                style={{ marginLeft: '12px', color: 'white' }}
                                              />
                                              <RecordVoiceOverIcon style={{ color: 'white' }} />
                                            </ListItem>
                                          </>
                                        );
                                      }
                                    }
                                  });
                                }
                              })}
                          </div>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </List>
            </Scrollbars>
          </TabPanel>
          <TabPanel value="5">
            <Scrollbars>
              <List sx={{ width: '100%' }} component="nav" aria-label="mailbox folders">
                {banList?.map((banedUser) => {
                  return (
                    <ListItem
                      button
                      onClick={(e) => {
                        onClickUnBanUser(e, banedUser.userId);
                      }}
                    >
                      <Avatar
                        src={banedUser.profile}
                        alt="Avatar"
                        style={{ border: '2px solid red' }}
                      />
                      <ListItemText primary={banedUser.userId} style={{ marginLeft: '12px' }} />
                    </ListItem>
                  );
                })}
              </List>
            </Scrollbars>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default Admin;
