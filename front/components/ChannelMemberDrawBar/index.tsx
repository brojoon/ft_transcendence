import React, { VFC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Scrollbars from 'react-custom-scrollbars';
import { useParams } from 'react-router-dom';
import { IAllUser, IMemberList } from '@typings/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';

interface Props {
  onClickSettingBtn: (e: any) => void;
}
const ChannelMemberDrawBar: VFC<Props> = ({ onClickSettingBtn }) => {
  const { id } = useParams<{ id: string }>();
  const { data: memberList } = useSWR<IMemberList[]>(`/api/channels/userList/${id}`, fetcher);
  const { data: alluser } = useSWR<IAllUser[], any[]>('/api/users/alluser', fetcher);
  console.log(memberList);
  return (
    <div
      style={{
        backgroundColor: '#363636',
        width: '380px',
        height: '100%',
        right: 0,
        // left: 'auto',
        // transform: 'translate(0%)',
        // overflowY: 'auto',
        // overflowX: 'hidden',
        display: 'flex',
        margin: 0,
        flexDirection: 'column',
        alignItems: 'center',
        // visibility: 'hidden',
      }}
    >
      <Scrollbars>
        <div>
          <ListItem style={{ fontSize: '12px', marginTop: '11px', color: 'gray' }}>Owner</ListItem>
          {memberList
            ? memberList[0].Chatmembers.map((member) => {
                if (member.auth === 2) {
                  return alluser?.map((user) => {
                    if (user.userId == member.userId) {
                      console.log('here');
                      return (
                        <ListItem button>
                          <Avatar
                            src={user.profile}
                            alt="Avatar"
                            style={{ border: '2px solid red', width: '38px', height: '38px' }}
                          />
                          <ListItemText
                            primary={user.userId}
                            style={{ marginLeft: '12px', color: 'white' }}
                          />
                        </ListItem>
                      );
                    }
                  });
                }
              })
            : null}
          <ListItem style={{ fontSize: '12px', marginTop: '11px', color: 'gray' }}>Admin</ListItem>
          {memberList
            ? memberList[0].Chatmembers.map((member) => {
                if (member.auth === 1) {
                  return alluser?.map((user) => {
                    if (user.userId == member.userId) {
                      console.log('here');
                      return (
                        <ListItem button>
                          <Avatar
                            src={user.profile}
                            alt="Avatar"
                            style={{ border: '2px solid red', width: '38px', height: '38px' }}
                          />
                          <ListItemText
                            primary={user.userId}
                            style={{ marginLeft: '12px', color: 'white' }}
                          />
                        </ListItem>
                      );
                    }
                  });
                }
              })
            : null}
          <ListItem style={{ fontSize: '12px', marginTop: '11px', color: 'gray' }}>Users</ListItem>
          {memberList
            ? memberList[0].Chatmembers.map((member) => {
                if (member.auth === 0) {
                  return alluser?.map((user) => {
                    if (user.userId == member.userId) {
                      console.log('here');
                      return (
                        <ListItem button>
                          <Avatar
                            src={user.profile}
                            alt="Avatar"
                            style={{ border: '2px solid red', width: '38px', height: '38px' }}
                          />
                          <ListItemText
                            primary={user.userId}
                            style={{ marginLeft: '12px', color: 'white' }}
                          />
                        </ListItem>
                      );
                    }
                  });
                }
              })
            : null}
        </div>
      </Scrollbars>
      <Button
        variant="contained"
        onClick={onClickSettingBtn}
        style={{
          width: '200px',
          height: '35px',
          backgroundColor: '#597aff',
          borderColor: '#597aff',
          fontWeight: 'bold',
          margin: '10px 0',
        }}
      >
        SETTING &nbsp;
        <SettingsIcon />
      </Button>
    </div>
  );
};

export default ChannelMemberDrawBar;
