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
import { useParams, useHistory } from 'react-router-dom';
import getSocket from '@utils/useSocket';
import config from '@utils/config';
import { DirectMessageContainer } from './style';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
import DMLeftDrawer from '@components/DMLeftDrawer';
import dayjs from 'dayjs';

const DirectMessage = () => {
  const [chat, setChat] = useState('');
  const { id } = useParams<{ id: string }>();
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher);
  const { data: userId } = useSWR<string>(`/api/dms/findDmUser/${id}`, fetcher);
  const { data: myDMList } = useSWR<IDmList[]>(`/api/dms/dmlist`, fetcher);
  const [messageRevalidate, setMessageRevalidate] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 700 });
  const isMobileHeader = useMediaQuery({ maxWidth: 420 });

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

  const history = useHistory();
  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (chatData && chatData[chatData.length - 1]?.length < 20) || false;
  const scrollbarRef = useRef<Scrollbars>(null);
  const socket = getSocket();

  const onSubmitChat = useCallback(() => {
    if (chat?.trim() && chatData) {
      mutateChat((prevChatData) => {
        prevChatData?.[0].unshift({
          id: prevChatData[0][0].id + 1,
          dmId: parseInt(id),
          userId1: myData?.userId,
          userId2: userId,
          message: chat,
          match: 0,
          createdAt: dayjs(new Date()).add(9, "hour"),
          updatedAt: dayjs(new Date()).add(9, "hour"),
          historyId: 0,
        });
        return prevChatData;
      }, false);
      axios
        .post(
          `/api/dms/sendMessage/${userId}/0/0`,
          {
            message: chat,
          },
          config,
        )
        .catch((error) => {
          if (error.response.data.data.message === 'Block 상태') {
            toast.error(' Cant send message because it is blocked', {
              autoClose: 3000,
              position: toast.POSITION.TOP_RIGHT,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              theme: 'colored',
            });
          } else {
            toast.error(error.message, {
              autoClose: 3000,
              position: toast.POSITION.TOP_RIGHT,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              theme: 'colored',
            });
          }
          mutateChat();
        });
      setChat('');
      setTimeout(() => {
        scrollbarRef.current?.scrollToBottom();
      }, 50);
    }
  }, [chat]);

  const onMessage = useCallback(
    (data) => {
      console.log(data);
      if (data.userId1 != myData?.userId && data.dmId == id) {
        mutateChat((prevchatData) => {
          prevchatData?.[0].unshift(data);

          return prevchatData;
        }, false).then(() => {
          setMessageRevalidate((prev) => !prev);
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
    [myData, scrollbarRef, id],
  );

  useEffect(() => {
    if (myDMList) {
      let isUnauthorized = true;
      for (let item of myDMList) {
        if (item.id === parseInt(id)) {
          isUnauthorized = false;
          break;
        }
      }
      if (isUnauthorized) {
        history.push('/home');
      }
    }
  }, [myDMList]);

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
  }, [socket]);

  useEffect(() => {
    if (chatData?.length === 1) {
      scrollbarRef.current?.scrollToBottom();
    }
  }, [chatData]);

  return (
    <>
      {isMobile ? null : <DMLeftDrawer />}
      <DirectMessageContainer>
        {isMobileHeader ? null : <ChatHeader />}

        <DMChatList
          chatData={chatData}
          scrollbarRef={scrollbarRef}
          isReachingEnd={isReachingEnd}
          setSize={setSize}
        />
        <ChatBox chat={chat} setChat={setChat} onSubmitChat={onSubmitChat} />
      </DirectMessageContainer>
    </>
  );
};

export default DirectMessage;
