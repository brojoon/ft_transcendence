import ChatBox from '@components/ChatBox';
import ChatHeader from '@components/DMChatHeader';
import DMChatList from '@components/DMChatList';
import { AutoFixOffSharp } from '@mui/icons-material';
import { IChatList, IDmList, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import getSocket from '@utils/useSocket';
import getToken from '@utils/getToken';
import config from '@utils/config';

const DirectMessage = () => {
  const [chat, setChat] = useState('');
  const { id } = useParams<{ id: string }>();
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: userId } = useSWR<string>(`/api/dms/findDmUser/${id}`, fetcher);

  const { data: chatData, mutate: mutateChat } = useSWR<IChatList[]>(
    `/api/dms/getAllMessageUseDmId/${id}`,
    fetcher,
  );
  const scrollbarRef = useRef<Scrollbars>(null);
  const socket = getSocket();
  const onSubmitChat = useCallback(
    (e) => {
      e.preventDefault();
      if (chat?.trim() && chatData) {
        mutateChat((prevChatData) => {
          prevChatData?.unshift({
            id: prevChatData[0].id + 1,
            dmId: parseInt(id),
            userId1: myData?.userId,
            userId2: userId,
            message: chat,
            match: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            historyId: 0,
          });
          return prevChatData;
        }, false);
        axios.post(
          `/api/dms/sendMessage/${userId}/0/0`,
          {
            message: chat,
          },
          config,
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
  const onMessage = useCallback(
    (data) => {
      console.log(data);
      console.log('dm왔다!');
      if (data.userId1 != myData?.userId) {
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
    socket?.on('dm', onMessage);
    return () => {
      socket?.off('dm');
    };
  }, [socket, onMessage]);

  useEffect(() => {
    setTimeout(() => {
      scrollbarRef.current?.scrollToBottom();
    }, 50);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ChatHeader />
      <DMChatList chatData={chatData} scrollbarRef={scrollbarRef} />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitChat={onSubmitChat} />
    </div>
  );
};

export default DirectMessage;
