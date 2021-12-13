import React, { useCallback, RefObject, VFC, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { IChatList, IAllUser, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import Scrollbars from 'react-custom-scrollbars';
import useSWR from 'swr';
import Button from '@mui/material/Button';
import { DMChatListContainer, StickyHeader } from './style';
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
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  console.log('chatData', chatData);

  const onScroll = useCallback(
    (values) => {
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
    },
    [setSize, isReachingEnd, scrollbarRef],
  );

  const chatSections = makeSectionDM(chatData ? chatData.flat().reverse() : []);
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
                      {chat.match === 0 && (
                        <div>
                          <div>{chat.userId1}</div>
                          <p className="chat">{chat.message}</p>
                        </div>
                      )}
                      {chat.match === 1 && (
                        <div className="challenge-join-wrapper">
                          <div>
                            <div>{chat.userId1}</div>
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
                            <div>{chat.userId1}</div>
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
