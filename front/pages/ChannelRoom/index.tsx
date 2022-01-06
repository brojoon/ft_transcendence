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
import { toast } from 'react-toastify';
import ChannelLeftDrawBar from '@components/ChannelLeftDrawBar';
import { useMediaQuery } from 'react-responsive';

const ChannelRoom = () => {
  const { id } = useParams<{ id: string }>();
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher);
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

  // const { data: MymuteMmbers, mutate: mutateMymuteMmbers } = useSWR<IMemberList[]>(
  //   `/api/channels/mutedMembers/${id}`,
  //   fetcher,
  // );

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
  const [messageRevalidate, setMessageRevalidate] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 700 });

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
      setSelectedIndex(-1);
      setMembersToggle((prev) => !prev);
    },
    [membersToggle, setMembersToggle],
  );

  const onClickSettingBtn = useCallback(
    (e) => {
      e.preventDefault();
      setSettingToggle((prev) => !prev);
    },
    [settingToggle, setSettingToggle],
  );

  const onSubmitChat = useCallback(() => {
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
        .catch((error) => {
          toast.error(error.message, {
            autoClose: 4000,
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
          });
          mutateChat();
        });
      setChat('');
      setTimeout(() => {
        scrollbarRef.current?.scrollToBottom();
      }, 50);
    }
  }, [chat]);
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
        .get(`/api/channels/getout/${id}`, config)
        .then(() => {
          mutateAllChannelList();
          mutateMyChannelList();
          setChannelLeaveModal(false);
          history.push('/channels');
        })
        .catch((error) => {
          toast.error(error.message, {
            autoClose: 4000,
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
          });
        });
    },
    [channelLeaveModal],
  );

  const onMessage = useCallback(
    (data) => {
      if (data.userId != myData?.userId) {
        mutateChat((prevchatData) => {
          prevchatData?.[0].unshift({
            userId: data.userId,
            message: data.msg,
            updatedAt: data.createdAt,
          });

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
    [myData, scrollbarRef],
  );

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
    socket?.on('join', mutateChannelMembers);
    return () => {
      socket?.off('join');
    };
  }, [socket]);

  useEffect(() => {
    socket?.on('leave', mutateChannelMembers);
    return () => {
      socket?.off('leave');
    };
  }, [socket]);

  useEffect(() => {
    socket?.on('channelType', () => {
      mutateMyChannelList();
    });
    return () => {
      socket?.off('channelType');
    };
  }, [socket]);

  useEffect(() => {
    socket?.on('channelDelete', () => {
      mutateMyChannelList();
      history.push('/channels');
    });
    return () => {
      socket?.off('channelDelete');
    };
  }, [socket]);

  useEffect(() => {
    socket?.on('admin', mutateChannelMembers);
    return () => {
      socket?.off('admin');
    };
  }, [socket]);

  useEffect(() => {
    socket?.on('ban', mutateChannelMembers);
    return () => {
      socket?.off('ban');
    };
  }, [socket]);

  useEffect(() => {
    socket?.on('mute', () => {
      mutateChannelMembers();
      mutateMyMute();
    });
    return () => {
      socket?.off('mute');
    };
  }, [socket]);

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

  useEffect(() => {
    if (chatData?.length === 1) {
      scrollbarRef.current?.scrollToBottom();
    }
  }, [chatData]);

  return (
    <>
      {isMobile ? null : <ChannelLeftDrawBar />}
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
          {!myMute && <ChatBox chat={chat} setChat={setChat} onSubmitChat={onSubmitChat} />}
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
    </>
  );
};

export default ChannelRoom;
