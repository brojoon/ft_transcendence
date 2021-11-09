import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IAllUser } from '@typings/db';
import { useParams } from 'react-router-dom';

const ChannelHeader = () => {
  const { id } = useParams<{ id: string }>();
  const { data: userId } = useSWR<string>(`/api/dms/findDmUser/${id}`, fetcher);
  const { data: alluser } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: '#272727' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Discover some channels
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ChannelHeader;
