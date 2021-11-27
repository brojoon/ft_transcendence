import React, { VFC, useState, useCallback } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Scrollbars from 'react-custom-scrollbars';
import { useParams, useHistory } from 'react-router-dom';
import { IAllUser, IMemberList, IUser, IChannelList } from '@typings/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import BasicModal from '@components/BasicModal';
import getToken from '@utils/getToken';
import axios from 'axios';
import { Container } from './style';
import ChannelProfile from '@components/ChannelProfile';
// import ChannelMember from '@components/ChannelMember';
import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

interface Props {
  onClickSettingBtn: (e: any) => void;
  onClickMembersToggle: (e: any) => void;
  onClickChannelLeaveModal: (e: any) => void;
  onClickChannelInviteModal: (e: any) => void;
  onClickMember: (e: any, index: number) => void;
  selectedIndex: number;
  membersToggle: boolean;
}
const ChannelMemberDrawBar: VFC<Props> = ({
  onClickMembersToggle,
  onClickSettingBtn,
  onClickChannelLeaveModal,
  onClickChannelInviteModal,
  onClickMember,
  selectedIndex,
  membersToggle,
}) => {
  const { id } = useParams<{ id: string }>();
  const { data: memberList } = useSWR<IMemberList[]>(`/api/channels/userList/${id}`, fetcher);
  const { data: alluser } = useSWR<IAllUser[], any[]>('/api/users/alluser', fetcher);
  const { data: allChannelList, mutate: mutateAllChannelList } = useSWR<IChannelList[]>(
    `/api/channels/allChannelList`,
    fetcher,
  );
  const { data: myChannelList, mutate: mutateMyChannelList } = useSWR<IChannelList[]>(
    `/api/channels/myChannelList`,
    fetcher,
  );
  const { data: isOwner } = useSWR<boolean>(`/api/channels/checkOwner/${id}`, fetcher);
  const { data: isAdmin } = useSWR<boolean>(`/api/channels/checkAdmin/${id}`, fetcher);

  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: MymuteMmbers, mutate: mutateMymuteMmbers } = useSWR<IMemberList[]>(
    `/api/channels/mutedMembers/${id}`,
    fetcher,
  );

  console.log(MymuteMmbers);

  const history = useHistory();

  if (memberList?.length === 0) {
    history.push('/ft_transcendence/channels');
  }
  return (
    <>
      {membersToggle && (
        <div
          onClick={onClickMembersToggle}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(30, 30, 030, 0.5)',
            zIndex: 100,
          }}
        ></div>
      )}
      <Container className={'MemberDrawBar ' + (membersToggle ? 'visible' : 'hidden')}>
        <Scrollbars>
          <div>
            <ListItem style={{ fontSize: '16px', marginTop: '11px', color: 'gray' }}>
              Owner
            </ListItem>
            {memberList &&
              memberList?.map((member) => {
                if (member.auth === 2) {
                  return alluser?.map((user, index) => {
                    if (user.userId == member.userId) {
                      return (
                        <>
                          {selectedIndex === index && user.userId !== myData?.userId && (
                            <ChannelProfile user={user} />
                          )}
                          <ListItem button onClick={(e) => onClickMember(e, index)}>
                            <Avatar
                              src={user.profile}
                              alt="Avatar"
                              style={{ border: '2px solid red', width: '38px', height: '38px' }}
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
            <ListItem style={{ fontSize: '16px', marginTop: '11px', color: 'gray' }}>
              Admin
            </ListItem>
            {memberList &&
              memberList?.map((member) => {
                if (member.auth === 1) {
                  return alluser?.map((user, index) => {
                    if (user.userId == member.userId) {
                      return (
                        <>
                          {selectedIndex === index && user.userId !== myData?.userId && (
                            <ChannelProfile user={user} />
                          )}
                          <ListItem button onClick={(e) => onClickMember(e, index)}>
                            <Avatar
                              src={user.profile}
                              alt="Avatar"
                              style={{ border: '2px solid red', width: '38px', height: '38px' }}
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
            <ListItem style={{ fontSize: '16px', marginTop: '11px', color: 'gray' }}>
              Users
            </ListItem>
            {memberList &&
              memberList?.map((member, index) => {
                if (member.auth === 0) {
                  return alluser?.map((user) => {
                    if (user.userId == member.userId) {
                      if (MymuteMmbers && MymuteMmbers.length > 0) {
                        return MymuteMmbers?.map((muteMember: IMemberList) => {
                          if (muteMember.userId === user.userId) {
                            if (muteMember.mute) {
                              return (
                                <>
                                  {selectedIndex === index && user.userId !== myData?.userId && (
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
                            {selectedIndex === index && user.userId !== myData?.userId && (
                              <ChannelProfile user={user} />
                            )}
                            <ListItem button onClick={(e) => onClickMember(e, index)}>
                              <Avatar
                                src={user.profile}
                                alt="Avatar"
                                style={{ border: '2px solid red', width: '38px', height: '38px' }}
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
        </Scrollbars>
        {isOwner && (
          <Button
            variant="contained"
            onClick={onClickSettingBtn}
            style={{
              width: '200px',
              height: '35px',
              backgroundColor: '#597aff',
              borderColor: '#597aff',
              fontWeight: 'bold',
              margin: '10px 0',
            }}
          >
            SETTING &nbsp;
            <SettingsIcon />
          </Button>
        )}
        {isAdmin && (
          <Button
            variant="contained"
            onClick={onClickChannelInviteModal}
            style={{
              width: '200px',
              height: '35px',
              backgroundColor: '#597aff',
              borderColor: '#597aff',
              fontWeight: 'bold',
              margin: '10px 0',
            }}
          >
            INVITE &nbsp;
            <PersonAddAlt1RoundedIcon />
          </Button>
        )}
        {isOwner === false && (
          <Button
            variant="contained"
            onClick={onClickChannelLeaveModal}
            style={{
              width: '200px',
              height: '35px',
              backgroundColor: '#597aff',
              borderColor: '#597aff',
              fontWeight: 'bold',
              margin: '10px 0',
            }}
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
