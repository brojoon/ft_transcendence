import React, { RefObject, VFC } from 'react';
import Chat from '@components/Chat';
import Scrollbars from 'react-custom-scrollbars';

interface Props {
  chatData: string[];
  scrollbarRef: RefObject<Scrollbars>;
}

const ChatList: VFC<Props> = ({ chatData, scrollbarRef }) => {
  return (
    <div
      style={{
        background: '#1e1e1e',
        width: '100%',
        height: '100%',
        padding: '8px 0 8px 15px',
      }}
    >
      <Scrollbars autoHide ref={scrollbarRef}>
        {chatData?.map((chat) => (
          <div style={{ color: 'white', display: ' flex' }}>
            <div style={{ marginRight: '10px' }}>profile</div>
            <div>
              <div>id</div>
              <p style={{ marginTop: '0' }}>{chat}</p>
            </div>
          </div>
        ))}
      </Scrollbars>
    </div>
  );
};

export default ChatList;
