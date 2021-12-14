import ChatBox from '@components/ChatBox';
import { IChannelChatList, IChannelList, IMemberList, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState, VFC } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { useParams, useHistory } from 'react-router-dom';
import getSocket from '@utils/useSocket';
import ChannelChatHeader from '@components/ChannelChatHeader';
import ChannelChatList from '@components/ChannelChatList';
import ChannelMemberDrawBar from '@components/ChannelMemberDrawBar';
import ChannelRoomSettingModal from '@components/ChannelRoomSettingModal';
import BasicModal from '@components/BasicModal';
import ChannelInviteModal from '@components/ChannelInviteModal';
import config from '@utils/config';
import { ChannelRoomContainer } from './style';
import { BrandingWatermarkTwoTone } from '@mui/icons-material';

const ChannelRoom = () => {
  const { id } = useParams<{ id: string }>();
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: ChannelMembers, mutate: mutateChannelMembers } = useSWR<IMemberList[]>(
    `/api/channels/userList/${id}`,
    fetcher,
  );
  const { data: allChannelList, mutate: mutateAllChannelList } = useSWR<IChannelList[]>(
    `/api/channels/allChannelList`,
    fetcher,
  );
  const { data: myChannelList, mutate: mutateMyChannelList } = useSWR<IChannelList[]>(
    `/api/channels/myChannelList`,
    fetcher,
  );
  const { data: myMute, mutate: mutateMyMute } = useSWR<boolean>(
    `/api/channels/checkMyMute/${id}`,
    fetcher,
  );

  const { data: MymuteMmbers, mutate: mutateMymuteMmbers } = useSWR<IMemberList[]>(
    `/api/channels/mutedMembers/${id}`,
    fetcher,
  );

  const {
    data: chatData,
    mutate: mutateChat,
    setSize,
  } = useSWRInfinite<IChannelChatList[]>(
    (index) => `/api/channels/20MessageList/${id}/${index * 19}`,
    fetcher,
  );

  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (chatData && chatData[chatData.length - 1]?.length < 20) || false;

  const scrollbarRef = useRef<Scrollbars>(null);
  const socket = getSocket();
  const history = useHistory();
  const [chat, setChat] = useState('');
  const [settingToggle, setSettingToggle] = useState(false);
  const [membersToggle, setMembersToggle] = useState(false);
  const [channelLeaveModal, setChannelLeaveModal] = useState(false);
  const [channelInviteModal, setChannelInviteModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

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

  const onClickChannelInviteModal = useCallback(
    (e) => {
      e.preventDefault();
      setChannelInviteModal((prev) => !prev);
    },
    [channelInviteModal],
  );

  const onClickMembersToggle = useCallback(
    (e) => {
      e.preventDefault();
      console.log(membersToggle);
      setSelectedIndex(-1);
      setMembersToggle((prev) => !prev);
    },
    [membersToggle, setMembersToggle],
  );

  const onClickSettingBtn = useCallback(
    (e) => {
      e.preventDefault();
      console.log(settingToggle);
      setSettingToggle((prev) => !prev);
    },
    [settingToggle, setSettingToggle],
  );

  const onSubmitChat = useCallback(
    (e) => {
      e.preventDefault();
      if (chat?.trim() && chatData) {
        mutateChat((prevChatData) => {
          prevChatData?.[0].unshift({
            userId: myData?.userId,
            message: chat,
            updatedAt: new Date(),
          });
          return prevChatData;
        }, false);
        axios
          .post(
            `/api/channels/send/${id}`,
            {
              msg: chat,
            },
            config,
          )
          .then(() => {})
          .catch((error) => {
            console.log(error.data);
          });
        console.log(chat);
        setChat('');
        setTimeout(() => {
          scrollbarRef.current?.scrollToBottom();
        }, 50);
      }
    },
    [chat],
  );
  const onChangeChat = useCallback(
    (e) => {
      setChat(e.target.value);
    },
    [chat],
  );

  const onClickChannelLeaveModal = useCallback(
    (e) => {
      e.preventDefault();
      setChannelLeaveModal((prev) => !prev);
    },
    [channelLeaveModal, setChannelLeaveModal],
  );
  const onClickChannelLeaveMdoalYes = useCallback(
    (e) => {
      e.preventDefault();
      axios.get(`/api/channels/getout/${id}`, config).then(() => {
        mutateAllChannelList();
        mutateMyChannelList();
        setChannelLeaveModal(false);
        history.push('/channels');
      });
    },
    [channelLeaveModal],
  );

  const channelRevalidate = useCallback(() => {
    console.log('channel revalidated!!!');
    mutateChannelMembers();
    mutateMyChannelList();
    mutateAllChannelList();
    mutateMyMute();
    mutateMymuteMmbers();
  }, []);

  const onMessage = useCallback((data) => {
    console.log('ch왔다!');
    if (data.userId != myData?.userId) {
      mutateChat((prevchatData) => {
        prevchatData?.unshift(data);
        return prevchatData;
      }, true).then(() => {
        if (scrollbarRef.current) {
          if (
            scrollbarRef.current.getScrollHeight() <
            scrollbarRef.current.getClientHeight() + scrollbarRef.current.getScrollTop() + 150
          ) {
            setTimeout(() => {
              scrollbarRef.current?.scrollToBottom();
            }, 50);
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    if (myChannelList) {
      let isUnauthorized = true;
      for (let channel of myChannelList) {
        if (channel.id === parseInt(id)) {
          isUnauthorized = false;
          break;
        }
      }
      if (isUnauthorized) {
        history.push('/home');
      }
    }
  }, [myChannelList]);

  useEffect(() => {
    socket?.on('ch', onMessage);
    socket?.on('join', channelRevalidate);
    socket?.on('leave', channelRevalidate);
    socket?.on('channelType', channelRevalidate);
    socket?.on('channelDelete', channelRevalidate);
    socket?.on('admin', channelRevalidate);
    socket?.on('ban', channelRevalidate);
    socket?.on('mute', channelRevalidate);
    return () => {
      socket?.off('ch', onMessage);
      socket?.off('join', channelRevalidate);
      socket?.off('leave', channelRevalidate);
      socket?.off('channelType', channelRevalidate);
      socket?.off('channelDelete', channelRevalidate);
      socket?.off('admin', channelRevalidate);
      socket?.off('ban', channelRevalidate);
      socket?.off('mute', channelRevalidate);
    };
  }, [socket, onMessage, channelRevalidate]);

  useEffect(() => {
    setTimeout(() => {
      scrollbarRef.current?.scrollToBottom();
    }, 50);
  }, [socket]);

  useEffect(() => {
    if (chatData?.length === 1) {
      scrollbarRef.current?.scrollToBottom();
    }
  }, [chatData]);

  return (
    <>
      <ChannelRoomSettingModal
        settingToggle={settingToggle}
        onClickSettingBtn={onClickSettingBtn}
      />
      <ChannelRoomContainer>
        <ChannelChatHeader
          membersToggle={membersToggle}
          onClickMembersToggle={onClickMembersToggle}
        />
        <ChannelChatList
          chatData={chatData}
          scrollbarRef={scrollbarRef}
          setSize={setSize}
          isReachingEnd={isReachingEnd}
        />
        {!myMute && <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitChat={onSubmitChat} />}
      </ChannelRoomContainer>
      <ChannelMemberDrawBar
        onClickMembersToggle={onClickMembersToggle}
        onClickSettingBtn={onClickSettingBtn}
        onClickChannelLeaveModal={onClickChannelLeaveModal}
        onClickChannelInviteModal={onClickChannelInviteModal}
        onClickMember={onClickMember}
        selectedIndex={selectedIndex}
        membersToggle={membersToggle}
        setSelectedIndex={setSelectedIndex}
      />
      {channelInviteModal && (
        <ChannelInviteModal
          onClickModalClose={onClickChannelInviteModal}
          setChannelInviteModal={setChannelInviteModal}
        />
      )}
      {channelLeaveModal && (
        <BasicModal
          headerContent="Leave Channel"
          content={`Are you really leaving this channel?`}
          NoBtn={onClickChannelLeaveModal}
          YesBtn={onClickChannelLeaveMdoalYes}
        />
      )}
    </>
  );
};

export default ChannelRoom;
