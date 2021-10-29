import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import gravatar from 'gravatar';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { AllUser } from '@typings/db';

const style = {
  width: '100%',
  bgcolor: '#1e1e1e',
};

export default function ListDividers() {
  const { data: users } = useSWR<AllUser[], any[]>('/api/users/alluser', fetcher);
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      {users?.map((user) => {
        return (
          <ListItem button>
            <Avatar src={user.profile} alt="Avatar" style={{ border: '2px solid red' }} />
            <ListItemText primary={user.userId} style={{ marginLeft: '12px' }} />
          </ListItem>
        );
      })}
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>{' '}
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
    </List>
  );
}
