import React, { useCallback, useState, VFC } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

interface Props {
  onChangeChat: (e: any) => void;
  onSubmitChat: (e: any) => void;
  chat: string;
}

const ChatBox: VFC<Props> = ({ chat, onSubmitChat, onChangeChat }) => {
  return (
    <div
      style={{
        height: '60px',
        backgroundColor: '#272727',
        padding: '20px 6px 3px 16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <input
          style={{
            width: '95%',
            outline: 'none',
            resize: 'none',
            borderRadius: '4px',
            background: '#bdbdbd',
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            height: '37px',
            color: 'black',
            border: 'none',
            padding: '10px',
          }}
          value={chat}
          onChange={onChangeChat}
        ></input>
        <button
          style={{
            background: '#272727',
            boxShadow: 'none',
            border: 'none',
            color: 'white',
            marginLeft: '10px',
            cursor: 'pointer',
          }}
          onClick={onSubmitChat}
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
