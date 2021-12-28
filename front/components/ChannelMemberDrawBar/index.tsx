import React, { VFC, useState, useCallback, useContext } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Scrollbars from 'react-custom-scrollbars';
import { useParams, useHistory } from 'react-router-dom';
import { IAllUser, IMemberList, IUser, IChannelList } from '@typings/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import { Container } from './style';
import ChannelProfile from '@components/ChannelProfile';
import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { ModalBackground, UserAvatar, ScrollbarColor } from './style';
import { SocketContext } from '@store/socket';

interface Props {
  onClickSettingBtn: (e: any) => void;
  onClickMembersToggle: (e: any) => void;
  onClickChannelLeaveModal: (e: any) => void;
  onClickChannelInviteModal: (e: any) => void;
  onClickMember: (e: any, index: number) => void;
  selectedIndex: number;
  setSelectedIndex: (e: any) => void;
  membersToggle: boolean;
}
const ChannelMemberDrawBar: VFC<Props> = ({
  onClickMembersToggle,
  onClickSettingBtn,
  onClickChannelLeaveModal,
  onClickChannelInviteModal,
  onClickMember,
  selectedIndex,
  setSelectedIndex,
  membersToggle,
}) => {
  const { id } = useParams<{ id: string }>();
  const { data: memberList } = useSWR<IMemberList[]>(`/api/channels/userList/${id}`, fetcher);
  const { data: alluser } = useSWR<IAllUser[], any[]>('/api/users/alluser', fetcher);
  const { data: isOwner } = useSWR<boolean>(`/api/channels/checkOwner/${id}`, fetcher);
  const { data: isAdmin } = useSWR<boolean>(`/api/channels/checkAdmin/${id}`, fetcher);

  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher);
  // const { data: MymuteMmbers, mutate: mutateMymuteMmbers } = useSWR<IMemberList[]>(
  //   `/api/channels/mutedMembers/${id}`,
  //   fetcher,
  // );
  const { onlineList, onGameList } = useContext(SocketContext);
  let isState;
  const history = useHistory();

  if (memberList?.length === 0) {
    history.push('/channels');
  }
  return (
    <>
      {membersToggle && <ModalBackground onClick={onClickMembersToggle}></ModalBackground>}
      <Container className={'MemberDrawBar ' + (membersToggle ? 'visible' : 'hidden')}>
        <Scrollbars renderThumbVertical={({ style, ...props }) => <ScrollbarColor {...props} />}>
          <div>
            <ListItem className="List-header">Owner</ListItem>
            {memberList &&
              memberList?.map((member) => {
                if (member.auth === 2) {
                  return alluser?.map((user, index) => {
                    if (user.userId == member.userId) {
                      isState = 0;
                      if (onGameList && onGameList[user.userId]) isState = 2;
                      if (isState === 0) {
                        onlineList?.map((onlineUser) => {
                          if (onlineUser.userId === user.userId) isState = 1;
                        });
                      }

                      return (
                        <div key={user.userId}>
                          {selectedIndex === index && user.userId !== myData?.userId && (
                            <ChannelProfile user={user} setSelectedIndex={setSelectedIndex} />
                          )}
                          <ListItem button onClick={(e) => onClickMember(e, index)}>
                            <UserAvatar
                              isstate={`${
                                isState
                                  ? isState === 1
                                    ? '2px solid #1ed14b'
                                    : '2px solid #FFD400'
                                  : '2px solid #d63638'
                              }`}
                              src={user.profile}
                              alt="Avatar"
                            />
                            <ListItemText className="member-text" primary={user.username} />
                            <RecordVoiceOverIcon className="unmute-icon" />
                          </ListItem>
                        </div>
                      );
                    }
                  });
                }
              })}
            <ListItem className="List-header">Admin</ListItem>
            {memberList &&
              memberList?.map((member) => {
                if (member.auth === 1) {
                  return alluser?.map((user, index) => {
                    if (user.userId == member.userId) {
                      isState = 0;
                      if (onGameList && onGameList[user.userId]) isState = 2;
                      if (isState === 0) {
                        onlineList?.map((onlineUser) => {
                          if (onlineUser.userId === user.userId) isState = 1;
                        });
                      }
                      return (
                        <div key={user.userId}>
                          {selectedIndex === index && user.userId !== myData?.userId && (
                            <ChannelProfile user={user} setSelectedIndex={setSelectedIndex} />
                          )}
                          <ListItem button onClick={(e) => onClickMember(e, index)}>
                            <UserAvatar
                              isstate={`${
                                isState
                                  ? isState === 1
                                    ? '2px solid #1ed14b'
                                    : '2px solid #FFD400'
                                  : '2px solid #d63638'
                              }`}
                              src={user.profile}
                              alt="Avatar"
                            />
                            <ListItemText className="member-text" primary={user.username} />
                            <RecordVoiceOverIcon className="unmute-icon" />
                          </ListItem>
                        </div>
                      );
                    }
                  });
                }
              })}
            <ListItem className="List-header">Users</ListItem>
            {memberList &&
              memberList?.map((member) => {
                if (member.auth === 0) {
                  return alluser?.map((user, index) => {
                    if (user.userId == member.userId) {
                      isState = 0;
                      if (onGameList && onGameList[user.userId]) isState = 2;
                      if (isState === 0) {
                        onlineList?.map((onlineUser) => {
                          if (onlineUser.userId === user.userId) isState = 1;
                        });
                      }
                      // let isMute = false;
                      // MymuteMmbers?.map((muteMember: IMemberList) => {
                      //   if (muteMember.userId === user.userId) {
                      //     if (muteMember.mute) isMute = true;
                      //   }
                      // });
                      return (
                        <div key={user.userId}>
                          {selectedIndex === index && user.userId !== myData?.userId && (
                            <ChannelProfile user={user} setSelectedIndex={setSelectedIndex} />
                          )}
                          <ListItem button onClick={(e) => onClickMember(e, index)}>
                            <UserAvatar
                              isstate={`${
                                isState
                                  ? isState === 1
                                    ? '2px solid #1ed14b'
                                    : '2px solid #FFD400'
                                  : '2px solid #d63638'
                              }`}
                              src={user.profile}
                              alt="Avatar"
                            />
                            <ListItemText className="member-text" primary={user.username} />
                            {member.mute ? (
                              <VoiceOverOffIcon className="mute-icon" />
                            ) : (
                              <RecordVoiceOverIcon className="unmute-icon" />
                            )}
                          </ListItem>
                        </div>
                      );
                    }
                  });
                }
              })}
            ;
          </div>
        </Scrollbars>
        {isOwner && (
          <Button className="channel-room-btn" variant="contained" onClick={onClickSettingBtn}>
            SETTING &nbsp;
            <SettingsIcon />
          </Button>
        )}
        {isAdmin && (
          <Button
            className="channel-room-btn"
            variant="contained"
            onClick={onClickChannelInviteModal}
          >
            INVITE &nbsp;
            <PersonAddAlt1RoundedIcon />
          </Button>
        )}
        {isOwner === false && (
          <Button
            className="channel-room-btn"
            variant="contained"
            onClick={onClickChannelLeaveModal}
          >
            LEAVE &nbsp;
            <ExitToAppIcon />
          </Button>
        )}
      </Container>
    </>
  );
};

export default ChannelMemberDrawBar;
