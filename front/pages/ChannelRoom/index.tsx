import ChatBox from '@components/ChatBox';
import { IChannelChatList, IChatList, IMemberList, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import getSocket from '@utils/useSocket';
import getToken from '@utils/getToken';
import ChannelChatHeader from '@components/ChannelChatHeader';
import ChannelChatList from '@components/ChannelChatList';
import ChannelMemberDrawBar from '@components/ChannelMemberDrawBar';
import { DriveFileMoveOutlined } from '@mui/icons-material';

const ChannelRoom = () => {
  const { id } = useParams<{ id: string }>();
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: ChannelMembers } = useSWR<IMemberList[]>(`/api/channels/userList/${id}`, fetcher);

  const { data: chatData, mutate: mutateChat } = useSWR<IChannelChatList[]>(
    `/api/channels/messageList/${id}`,
    fetcher,
  );
  const [chat, setChat] = useState('');
  const [membersToggle, setMembersToggle] = useState(false);
  const scrollbarRef = useRef<Scrollbars>(null);
  const socket = getSocket();
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

  const onClickMembersToggle = useCallback(
    (e) => {
      e.preventDefault();
      console.log(membersToggle);
      setMembersToggle((prev) => !prev);
    },
    [membersToggle, setMembersToggle],
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
        }}
      >
        <ChannelChatHeader onClickMembersToggle={onClickMembersToggle} />
        <ChannelChatList chatData={chatData} scrollbarRef={scrollbarRef} />
        <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitChat={onSubmitChat} />
      </div>
      <ChannelMemberDrawBar />
    </>
  );
};

export default ChannelRoom;
