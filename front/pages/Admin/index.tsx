import React, { useState, useCallback, useEffect } from 'react';
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
import { TabPanel1 } from '@components/TabPanel';
import { AdminPageContainer, AdminPageWrapper } from './style';

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
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isChannelDeleteModal, setIsChannelDeleteModal] = useState(false);

  console.log('moderator', moderatorList);

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

  const DeleteClickChannelBtn = useCallback(
    (e) => {
      e.preventDefault();
      axios.get(`/api/channels/deleteChannel/${id}`, config).then(() => {
        mutateChannelList();
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
      {isChannelDeleteModal && (
        <BasicModal
          NoBtn={onClickChannelDeleteModal}
          YesBtn={DeleteClickChannelBtn}
          headerContent="Delete Channel"
          content="This will remove the channel as well as all of its messages"
        />
      )}
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
                  return (
                    <ListItem
                      button
                      onClick={(e) => {
                        onClickUnModerator(e, moderator.userId);
                      }}
                    >
                      <Avatar className="tab-panel-2-avatar" src={moderator.profile} alt="Avatar" />
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
                    return (
                      <ListItem
                        button
                        onClick={(e) => {
                          onClickUserPrivilege(e, user.userId);
                        }}
                      >
                        <Avatar className="tab-panel-3-avatar" src={user.profile} alt="Avatar" />
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
                              <ListItem className="tab-panel-4-list-item">Owner</ListItem>
                              {memberList &&
                                memberList?.map((member) => {
                                  if (member.auth === 2) {
                                    return alluserList?.map((user, index) => {
                                      if (user.userId == member.userId) {
                                        return (
                                          <>
                                            {selectedIndex === index &&
                                              user.userId !== myData?.userId && (
                                                <AdminPageProfile
                                                  user={user}
                                                  setSelectedIndex={setSelectedIndex}
                                                />
                                              )}
                                            <ListItem
                                              button
                                              onClick={(e) => onClickMember(e, index)}
                                            >
                                              <Avatar
                                                className="tab-panel-4-avatar"
                                                src={user.profile}
                                                alt="Avatar"
                                              />
                                              <ListItemText
                                                className="tab-pannel-4-text"
                                                primary={user.userId}
                                              />
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
                                            {selectedIndex === index &&
                                              user.userId !== myData?.userId && (
                                                <AdminPageProfile
                                                  user={user}
                                                  setSelectedIndex={setSelectedIndex}
                                                />
                                              )}
                                            <ListItem
                                              button
                                              onClick={(e) => onClickMember(e, index)}
                                            >
                                              <Avatar
                                                className="tab-panel-4-avatar"
                                                src={user.profile}
                                                alt="Avatar"
                                              />
                                              <ListItemText
                                                className="tab-pannel-4-text"
                                                primary={user.userId}
                                              />
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
                                            {selectedIndex === index &&
                                              user.userId !== myData?.userId && (
                                                <AdminPageProfile
                                                  user={user}
                                                  setSelectedIndex={setSelectedIndex}
                                                />
                                              )}
                                            <ListItem
                                              button
                                              onClick={(e) => onClickMember(e, index)}
                                            >
                                              <Avatar
                                                className="tab-panel-4-avatar"
                                                src={user.profile}
                                                alt="Avatar"
                                              />
                                              <ListItemText
                                                className="tab-pannel-4-text"
                                                primary={user.userId}
                                              />
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
                        </AccordionDetails>
                      </Accordion>
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
                      <Avatar className="tab-panel-5-avatar" src={banedUser.profile} alt="Avatar" />
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
