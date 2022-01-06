import React, { useCallback, RefObject, VFC, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { IChatList, IAllUser, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import Scrollbars from 'react-custom-scrollbars';
import useSWR from 'swr';
import Button from '@mui/material/Button';
import { DMChatListContainer, StickyHeader, ScrollbarColor } from './style';
import { makeSectionDM } from '@utils/makeSection';
import { Link } from 'react-router-dom';

interface Props {
  chatData: IChatList[][] | undefined;
  scrollbarRef: RefObject<Scrollbars>;
  setSize: (f: (size: number) => number) => Promise<IChatList[][] | undefined>;
  isReachingEnd: boolean;
}

const DMChatList: VFC<Props> = ({ chatData, scrollbarRef, isReachingEnd, setSize }) => {
  const { data: alluser } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);
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
    [setSize, isReachingEnd, scrollbarRef],
  );

  const chatSections = makeSectionDM(chatData ? chatData.flat().reverse() : []);
  let username;
  console.log(chatSections);

  return (
    <DMChatListContainer>
      <Scrollbars
        ref={scrollbarRef}
        onScrollFrame={onScroll}
        renderThumbVertical={({ style, ...props }) => <ScrollbarColor {...props} />}
      >
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <div key={date}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {chats?.map((chat, index) => {
                username = '';
                return (
                  <div className="chatList-wrapper" key={chat.message + index}>
                    <div className="chatList-profile-wrapper">
                      {alluser?.map((user) => {
                        if (user.userId === chat.userId1) {
                          username = user.username;
                          return (
                            <Avatar
                              className="avatar"
                              src={user.profile}
                              alt="Avatar"
                              key={chat.message + index}
                            />
                          );
                        }
                      })}
                    </div>
                    {chat.match === 0 && (
                      <div>
                        <div>{username}</div>
                        <p className="chat">{chat.message}</p>
                      </div>
                    )}
                    {(chat.match === 1 || chat.match === 3) && (
                      <div className="challenge-join-wrapper">
                        <div>
                          <div>{username}</div>
                          <p className="chat">{chat.message}</p>
                        </div>
                        <Link to={`/game/ping-pong/${chat.historyId}`}>
                          <Button className="challenge-join-btn" variant="contained">
                            JOIN
                          </Button>
                        </Link>
                      </div>
                    )}
                    {chat.match === 2 && (
                      <div className="challenge-join-wrapper">
                        <div>
                          <div>{username}</div>
                          <p className="chat">{chat.message}</p>
                        </div>
                        <Link to={`/game/history/${chat.historyId}`}>
                          <Button className="challenge-join-btn" variant="contained">
                            HISTORY
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </Scrollbars>
    </DMChatListContainer>
  );
};

export default DMChatList;
