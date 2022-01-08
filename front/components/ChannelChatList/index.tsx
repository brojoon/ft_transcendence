import Avatar from '@mui/material/Avatar';
import { IAllUser, IUser, IChannelChatList, IBlockList } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { RefObject, VFC, useCallback } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { ChannelChatListContainer, StickyHeader, ScrollbarColor } from './style';
import { makeSectionChannel } from '@utils/makeSection';

interface Props {
  chatData: IChannelChatList[][] | undefined;
  scrollbarRef: RefObject<Scrollbars>;
  setSize: (f: (size: number) => number) => Promise<IChannelChatList[][] | undefined>;
  isReachingEnd: boolean;
}

const ChannelChatList: VFC<Props> = ({ chatData, scrollbarRef, setSize, isReachingEnd }) => {
  const { id } = useParams<{ id: string }>();
  const { data: alluser } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);
  const { data: blockList } = useSWR<IBlockList[]>('/api/friend/blocklist', fetcher);
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher);

  const onScroll = useCallback(
    (values) => {
      if (values.scrollTop === 0 && !isReachingEnd) {
        setSize((prevSize) => {
          return prevSize + 1;
        }).then(() => {
          if (scrollbarRef?.current) {
            scrollbarRef.current?.scrollTop(
              scrollbarRef.current?.getScrollHeight() - values.scrollHeight,
            );
          }
        });
      }
    },
    [scrollbarRef, setSize, isReachingEnd],
  );

  const chatSections = makeSectionChannel(chatData ? chatData.flat().reverse() : []);
  let username = '';

  return (
    <ChannelChatListContainer>
      <Scrollbars
        ref={scrollbarRef}
        onScrollFrame={onScroll}
        renderThumbVertical={({ style, ...props }) => <ScrollbarColor {...props} />}
      >
        {Object.entries(chatSections).map(([date, chats], index) => {
          return (
            <div key={index}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {chats?.map((chat: IChannelChatList, index) => {
                let isblock = false;
                blockList?.map((blockUser) => {
                  if (chat.userId === blockUser.userId2) isblock = true;
                });
                if (!isblock) {
                  return (
                    <div className="chat-container" key={index}>
                      <div className="profile-container ">
                        {alluser?.map((user) => {
                          if (user.userId === chat.userId) {
                            username = user.username;
                            return (
                              <Avatar
                                className="chat-avatar"
                                src={user.profile}
                                alt="Avatar"
                                key={chat.message + index}
                              />
                            );
                          }
                        })}
                      </div>
                      <div>
                        <div>{username}</div>
                        <p className="chat-text">{chat.message}</p>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </Scrollbars>
    </ChannelChatListContainer>
  );
};

export default ChannelChatList;
