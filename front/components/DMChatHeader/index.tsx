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

const DMChatHeader = () => {
  const { id } = useParams<{ id: string }>();
  const { data: userId } = useSWR<string>(`/api/dms/findDmUser/${id}`, fetcher);
  const { data: alluser } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: '#272727' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {alluser?.map((user) => {
              if (user.userId === userId)
                return (
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar
                      src={user.profile}
                      alt="Avatar"
                      style={{ width: '40px', height: '40px', left: '-10px' }}
                    />
                    <span>{user.userId}</span>
                  </div>
                );
            })}
          </Typography>
          <Button
            sx={{
              backgroundColor: '#355DFF',
              color: 'white',
              width: '113',
              height: '36px',
              padding: '0 16px',
              fontWeight: 600,
            }}
          >
            CHALLENGE
            <span className="mdif786 mdi-sword-cross"></span>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default DMChatHeader;
