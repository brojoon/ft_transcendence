import ChatBox from '@components/ChatBox';
import ChatHeader from '@components/ChatHeader';
import ChatList from '@components/ChatList';
import { AutoFixOffSharp } from '@mui/icons-material';
import { IChatList, IDmList, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import useSWR from 'swr';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

let token = document.cookie.slice(document.cookie.indexOf('ts_token') + 9);
token = token.indexOf(' ') === -1 ? token : token.slice(0, token.indexOf(' '));

const DirectMessage = () => {
  const [chat, setChat] = useState('');
  const { id } = useParams<{ id: string }>();
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: dmList } = useSWR<IDmList[]>('/api/dms/dmlist', fetcher);
  // dmList?.forEach((dm) => {
  //   if (dm.id === parseInt(id)) {
  //     dm.Dmcontents[0].userId1 === myData?.userId
  //       ? (receiver = dm.Dmcontents[0].userId2)
  //       : (receiver = dm.Dmcontents[0].userId1);
  //   }
  // });
  const { data: chatData, mutate: mutateChat } = useSWR<IChatList[]>(
    `/api/dms/getMessage/${myData?.userId}/dmtest1`,
    fetcher,
  );
  const scrollbarRef = useRef<Scrollbars>(null);
  const { data: userData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const socket = io.connect('http://localhost:3095');

  const onSubmitChat = useCallback(
    (e) => {
      e.preventDefault();
      if (chat?.trim() && chatData) {
        axios.post(
          '/api/dms/getMessage/hyungjki/dmtest1/0/0',
          {
            message: chat,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
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
  const onMessage = useCallback((data) => {
    console.log('dm왔다!');
    if (data.userId1 != userData?.userId) {
      mutateChat((prevchatData) => {
        prevchatData?.unshift(data);
        return prevchatData;
      }, true);
    }
  }, []);

  useEffect(() => {
    socket?.on('dm', onMessage);
    return () => {
      socket?.off('dm', onMessage);
    };
  }, [socket, onMessage]);

  // useEffect(() => {
  //   socket?.on('dm', onMessage);
  //   return () => {
  //     socket?.off('dm', onMessage);
  //   };
  // }, [socket, onMessage]);

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
      <ChatList chatData={chatData} scrollbarRef={scrollbarRef} />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitChat={onSubmitChat} />
    </div>
  );
};

export default DirectMessage;
