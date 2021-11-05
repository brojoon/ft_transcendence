import Avatar from '@mui/material/Avatar';
import { IChatList, IAllUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { RefObject, VFC } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import useSWR from 'swr';

interface Props {
  chatData: IChatList[] | undefined;
  scrollbarRef: RefObject<Scrollbars>;
}

const ChatList: VFC<Props> = ({ chatData, scrollbarRef }) => {
  const { data: alluser } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);
  // const { data: chatlist } = useSWR<IChatList[]>('/api/dms/getMessage/hyungjki/dmtest', fetcher);

  const chatSections = chatData ? chatData.flat().reverse() : [];

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
        {chatSections?.map((chat) => (
          <div style={{ color: 'white', display: ' flex' }}>
            <div style={{ marginRight: '10px' }}>
              {alluser?.map((user) => {
                if (user.userId === chat.userId1)
                  return (
                    <Avatar
                      src={user.profile}
                      alt="Avatar"
                      style={{ width: '40px', height: '40px', marginBottom: '25px' }}
                    />
                  );
              })}
            </div>
            <div>
              <div>{chat.userId1}</div>
              <p style={{ marginTop: '0' }}>{chat.message}</p>
            </div>
          </div>
        ))}
      </Scrollbars>
    </div>
  );
};

export default ChatList;
