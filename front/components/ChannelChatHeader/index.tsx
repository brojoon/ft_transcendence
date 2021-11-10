import React, { VFC } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IMemberList } from '@typings/db';
import { useParams } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Fab from '@mui/material/Fab';

interface Props {
  onClickMembersToggle: (e: any) => void;
}

const ChannelChatHeader: VFC<Props> = ({ onClickMembersToggle }) => {
  const { id } = useParams<{ id: string }>();
  const { data: channelMemberList } = useSWR<IMemberList[]>(
    `/api/channels/userList/${id}`,
    fetcher,
  );
  return (
    <Box>
      <AppBar position="static" sx={{ bgcolor: '#272727' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {channelMemberList ? channelMemberList[0]?.name : ''}
          </Typography>
          <Fab
            aria-label="add"
            style={{ width: '40px', height: '40px' }}
            onClick={onClickMembersToggle}
          >
            <GroupsIcon />
          </Fab>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ChannelChatHeader;
