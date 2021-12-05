import React, { useCallback, useState, VFC } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { ChatBoxContainer } from './style';

interface Props {
  onChangeChat: (e: any) => void;
  onSubmitChat: (e: any) => void;
  chat: string;
}

const ChatBox: VFC<Props> = ({ chat, onSubmitChat, onChangeChat }) => {
  return (
    <ChatBoxContainer>
      <form className="chat-box-form">
        <input className="chat-box-input" value={chat} onChange={onChangeChat}></input>
        <button className="submit-btn" onClick={onSubmitChat}>
          <SendIcon />
        </button>
      </form>
    </ChatBoxContainer>
  );
};

export default ChatBox;
