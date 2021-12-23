import React, { VFC } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IMemberList, IChannelList } from '@typings/db';
import { useParams } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Fab from '@mui/material/Fab';
import { MyToolbar } from './style';

interface Props {
  onClickMembersToggle: (e: any) => void;
  membersToggle: boolean;
}

const ChannelChatHeader: VFC<Props> = ({ onClickMembersToggle, membersToggle }) => {
  const { id } = useParams<{ id: string }>();
  const { data: allChannelList } = useSWR<IChannelList[]>('/api/channels/allChannelList', fetcher);
  return (
    <Box>
      <AppBar position="static" sx={{ bgcolor: '#272727' }}>
        <MyToolbar>
          <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
            {allChannelList?.map((channel: IChannelList) => {
              if (channel.id === parseInt(id)) {
                return channel.name;
              }
            })}
          </Typography>
          <Fab
            aria-label="add"
            className={'myFab ' + (membersToggle ? 'on' : 'off')}
            onClick={onClickMembersToggle}
          >
            <GroupsIcon />
          </Fab>
        </MyToolbar>
      </AppBar>
    </Box>
  );
};

export default ChannelChatHeader;
