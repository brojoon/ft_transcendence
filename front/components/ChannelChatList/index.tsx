import Avatar from '@mui/material/Avatar';
import { IChatList, IAllUser, IUser, IChannelChatList, IBlockList } from '@typings/db';
import fetcher from '@utils/fetcher';
import { BlockList } from 'net';
import React, { RefObject, VFC } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { ChannelChatListContainer } from './style';

interface Props {
  chatData: IChannelChatList[] | undefined;
  scrollbarRef: RefObject<Scrollbars>;
}

const ChannelChatList: VFC<Props> = ({ chatData, scrollbarRef }) => {
  const { id } = useParams<{ id: string }>();
  const { data: alluser } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);
  const { data: blockList } = useSWR<IBlockList[]>('/api/friend/blocklist', fetcher);
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const chatSections = chatData ? chatData.flat().reverse() : [];

  return (
    <ChannelChatListContainer>
      <Scrollbars autoHide ref={scrollbarRef}>
        {chatSections?.map((chat) => {
          let isblock = false;
          blockList?.map((blockUser) => {
            if (chat.userId === blockUser.userId2) isblock = true;
          });
          if (!isblock) {
            return (
              <div className="chat-container">
                <div className="profile-container ">
                  {alluser?.map((user) => {
                    if (user.userId === chat.userId)
                      return <Avatar className="chat-avatar" src={user.profile} alt="Avatar" />;
                  })}
                </div>
                <div>
                  <div>{chat.userId}</div>
                  <p className="chat-text">{chat.message}</p>
                </div>
              </div>
            );
          }
        })}
      </Scrollbars>
    </ChannelChatListContainer>
  );
};

export default ChannelChatList;
