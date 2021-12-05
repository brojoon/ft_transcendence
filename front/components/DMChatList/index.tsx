import Avatar from '@mui/material/Avatar';
import { IChatList, IAllUser, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { RefObject, VFC } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import useSWR from 'swr';
import { DMChatListContainer } from './style';

interface Props {
  chatData: IChatList[] | undefined;
  scrollbarRef: RefObject<Scrollbars>;
}

const DMChatList: VFC<Props> = ({ chatData, scrollbarRef }) => {
  const { data: alluser } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const chatSections = chatData ? chatData.flat().reverse() : [];

  return (
    <DMChatListContainer>
      <Scrollbars autoHide ref={scrollbarRef}>
        {chatSections?.map((chat) => {
          return (
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
          );
        })}
      </Scrollbars>
    </DMChatListContainer>
  );
};

export default DMChatList;
