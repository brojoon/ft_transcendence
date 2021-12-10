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
import useSWRInfinite from 'swr/infinite';
import { useParams } from 'react-router-dom';
import getSocket from '@utils/useSocket';
import config from '@utils/config';
import { DirectMessageContainer } from './style';

const DirectMessage = () => {
  const [chat, setChat] = useState('');
  const { id } = useParams<{ id: string }>();
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: userId } = useSWR<string>(`/api/dms/findDmUser/${id}`, fetcher);

  // const { data: chatData, mutate: mutateChat } = useSWR<IChatList[]>(
  //   `/api/dms/getAllMessageUseDmId/${id}`,
  //   fetcher,
  // );
  const {
    data: chatData,
    mutate: mutateChat,
    setSize,
  } = useSWRInfinite<IChatList[]>(
    (index) => `/api/dms/get20MessageUseDmId/${id}/${index + 1}`,
    fetcher,
  );
  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (chatData && chatData[chatData.length - 1]?.length < 20) || false;
  const scrollbarRef = useRef<Scrollbars>(null);
  const socket = getSocket();
  const onSubmitChat = useCallback(
    (e) => {
      e.preventDefault();
      if (chat?.trim() && chatData) {
        mutateChat((prevChatData) => {
          prevChatData?.[0].unshift({
            id: prevChatData[0][0].id + 1,
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
  const onMessage = useCallback((data) => {
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
  }, []);

  useEffect(() => {
    socket?.on('dm', onMessage);
    return () => {
      socket?.off('dm');
    };
  }, [socket, onMessage]);

  useEffect(() => {
    if (chatData?.length === 1) {
      scrollbarRef.current?.scrollToBottom();
    }
  }, [chatData]);

  return (
    <DirectMessageContainer>
      <ChatHeader />
      <DMChatList
        chatData={chatData}
        scrollbarRef={scrollbarRef}
        isReachingEnd={isReachingEnd}
        setSize={setSize}
      />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitChat={onSubmitChat} />
    </DirectMessageContainer>
  );
};

export default DirectMessage;
