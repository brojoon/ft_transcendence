import Avatar from '@mui/material/Avatar';
import { IChatList, IAllUser, IUser, IChannelChatList } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { RefObject, VFC } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useParams } from 'react-router';
import useSWR from 'swr';

interface Props {
  chatData: IChannelChatList[] | undefined;
  scrollbarRef: RefObject<Scrollbars>;
}

const ChannelChatList: VFC<Props> = ({ chatData, scrollbarRef }) => {
  const { id } = useParams<{ id: string }>();
  const { data: alluser } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

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
        {chatSections?.map((chat) => {
          return (
            <div style={{ color: 'white', display: ' flex' }}>
              <div style={{ marginRight: '10px' }}>
                {alluser?.map((user) => {
                  if (user.userId === chat.userId)
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
                <div>{chat.userId}</div>
                <p style={{ marginTop: '0' }}>{chat.message}</p>
              </div>
            </div>
          );
        })}
      </Scrollbars>
    </div>
  );
};

export default ChannelChatList;
