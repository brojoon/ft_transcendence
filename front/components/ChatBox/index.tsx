import React, { useCallback, useEffect, useState, VFC } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { ChatBoxContainer } from './style';

interface Props {
  onSubmitChat: () => void;
  setChat: (chat: string) => void;
  chat: string;
}

const ChatBox: VFC<Props> = ({ chat, onSubmitChat, setChat }) => {
  const [chatBoxChat, setChatBoxChat] = useState('');
  const onChangeChatBoxChat = useCallback((e) => {
    setChatBoxChat(e.target.value);
  }, []);

  useEffect(() => {
    if (chat) {
      onSubmitChat();
      setChatBoxChat('');
    }
  }, [chat, onSubmitChat]);

  const onSubmitChatBoxChat = useCallback(
    (e) => {
      e.preventDefault();
      setChat(chatBoxChat);
    },
    [chatBoxChat, onSubmitChat],
  );

  return (
    <ChatBoxContainer>
      <form className="chat-box-form">
        <input
          className="chat-box-input"
          value={chatBoxChat}
          onChange={onChangeChatBoxChat}
        ></input>
        <button className="submit-btn" onClick={onSubmitChatBoxChat}>
          <SendIcon />
        </button>
      </form>
    </ChatBoxContainer>
  );
};

export default ChatBox;
