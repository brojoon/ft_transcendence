import React, { useCallback, RefObject, VFC } from 'react';
import Avatar from '@mui/material/Avatar';
import { IChatList, IAllUser, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import Scrollbars from 'react-custom-scrollbars';
import useSWR from 'swr';
import { DMChatListContainer, StickyHeader } from './style';
import makeSection from '@utils/makeSection';

interface Props {
  chatData: IChatList[][] | undefined;
  scrollbarRef: RefObject<Scrollbars>;
  setSize: (f: (size: number) => number) => Promise<IChatList[][] | undefined>;
  isReachingEnd: boolean;
}

const DMChatList: VFC<Props> = ({ chatData, scrollbarRef, isReachingEnd, setSize }) => {
  const { data: alluser } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  console.log('chatData', chatData);

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);
  const onScroll = useCallback((values) => {
    if (values.scrollTop === 0 && !isReachingEnd) {
      console.log('가장 위');
      setSize((prevSize) => {
        console.log(prevSize);
        return prevSize + 1;
      }).then(() => {
        if (scrollbarRef?.current) {
          console.log('가져오기!');
          scrollbarRef.current?.scrollTop(
            scrollbarRef.current?.getScrollHeight() - values.scrollHeight,
          );
        }
      });
    }
  }, []);
  console.log(chatSections);
  return (
    <DMChatListContainer>
      <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {chats?.map((chat) => {
                return (
                  <>
                    <div className="chatList-wrapper">
                      <div className="chatList-profile-wrapper">
                        {alluser?.map((user) => {
                          if (user.userId === chat.userId1)
                            return <Avatar className="avatar" src={user.profile} alt="Avatar" />;
                        })}
                      </div>
                      <div>
                        <div>{chat.userId1}</div>
                        <p className="chat">{chat.message}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          );
        })}
      </Scrollbars>
    </DMChatListContainer>
  );
};

export default DMChatList;
