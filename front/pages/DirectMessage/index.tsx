import ChatBox from '@components/ChatBox';
import ChatHeader from '@components/ChatHeader';
import ChatList from '@components/ChatList';
import React, { useCallback, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';

const DirectMessage = () => {
  const [chat, setChat] = useState('');
  const [chatData, setChatData] = useState<string[]>([]);
  const scrollbarRef = useRef<Scrollbars>(null);
  const onSubmitChat = useCallback(
    (e) => {
      e.preventDefault();
      if (chat?.trim()) {
        chatData.push(chat);
      }
      console.log(chatData);
      setChat('');
      setTimeout(() => {
        scrollbarRef.current?.scrollToBottom();
      }, 50);
    },
    [chatData, chat],
  );
  const onChangeChat = useCallback(
    (e) => {
      setChat(e.target.value);
    },
    [chat],
  );
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
