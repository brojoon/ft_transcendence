import ChatBox from '@components/ChatBox';
import { IChannelChatList, IChannelList, IChatList, IMemberList, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import useSWR from 'swr';
import { useParams, useHistory } from 'react-router-dom';
import getSocket from '@utils/useSocket';
import getToken from '@utils/getToken';
import ChannelChatHeader from '@components/ChannelChatHeader';
import ChannelChatList from '@components/ChannelChatList';
import ChannelMemberDrawBar from '@components/ChannelMemberDrawBar';
import ChannelRoomSettingModal from '@components/ChannelRoomSettingModal';
import BasicModal from '@components/BasicModal';
import ChannelInviteModal from '@components/ChannelInviteModal';

const ChannelRoom = () => {
  const { id } = useParams<{ id: string }>();
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: ChannelMembers } = useSWR<IMemberList[]>(`/api/channels/userList/${id}`, fetcher);

  const { data: chatData, mutate: mutateChat } = useSWR<IChannelChatList[]>(
    `/api/channels/allMessageList/${id}`,
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
  const [chat, setChat] = useState('');
  const [settingToggle, setSettingToggle] = useState(false);
  const [membersToggle, setMembersToggle] = useState(false);
  const [channelLeaveModal, setChannelLeaveModal] = useState(false);
  const [channelInviteModal, setChannelInviteModal] = useState(false);
  const scrollbarRef = useRef<Scrollbars>(null);
  const socket = getSocket();
  const history = useHistory();

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
          prevChatData?.unshift({
            userId: myData?.userId,
            message: chat,
            updatedAt: new Date(),
          });
          return prevChatData;
        }, false);
        axios.post(
          `/api/channels/send/${id}`,
          {
            msg: chat,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          },
        );
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
      axios
        .get(`/api/channels/getout/${id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then(() => {
          mutateAllChannelList();
          mutateMyChannelList();
          setChannelLeaveModal(false);
          history.push('/ft_transcendence/channels');
        });
    },
    [channelLeaveModal],
  );

  const onMessage = useCallback(
    (data) => {
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
    },
    [chatData],
  );

  useEffect(() => {
    socket?.on('ch', onMessage);
    return () => {
      socket?.off('ch', onMessage);
    };
  }, [socket, onMessage]);

  useEffect(() => {
    setTimeout(() => {
      scrollbarRef.current?.scrollToBottom();
    }, 50);
  }, [socket]);

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <ChannelChatHeader
          membersToggle={membersToggle}
          onClickMembersToggle={onClickMembersToggle}
        />
        <ChannelChatList chatData={chatData} scrollbarRef={scrollbarRef} />
        <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitChat={onSubmitChat} />
      </div>
      <ChannelMemberDrawBar
        onClickMembersToggle={onClickMembersToggle}
        onClickSettingBtn={onClickSettingBtn}
        onClickChannelLeaveModal={onClickChannelLeaveModal}
        onClickChannelInviteModal={onClickChannelInviteModal}
        membersToggle={membersToggle}
      />
      {channelInviteModal && <ChannelInviteModal onClickModalClose={onClickChannelInviteModal} />}
      {channelLeaveModal && (
        <BasicModal
          content={`Are you really leaving this channel?`}
          NoBtn={onClickChannelLeaveModal}
          YesBtn={onClickChannelLeaveMdoalYes}
        />
      )}
      <ChannelRoomSettingModal
        settingToggle={settingToggle}
        onClickSettingBtn={onClickSettingBtn}
      />
    </>
  );
};

export default ChannelRoom;
