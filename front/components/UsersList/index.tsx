import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import gravatar from 'gravatar';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { AllUser } from '@typings/db';
import Scrollbars from 'react-custom-scrollbars';

const style = {
  width: '100%',
  bgcolor: '#1e1e1e',
};

export default function ListDividers() {
  const { data: users } = useSWR<AllUser[], any[]>('/api/users/alluser', fetcher);
  return (
    <Scrollbars>
      <List sx={style} component="nav" aria-label="mailbox folders" style={{ height: '100%' }}>
        {users?.map((user) => {
          return (
            <ListItem button>
              <Avatar src={user.profile} alt="Avatar" style={{ border: '2px solid red' }} />
              <ListItemText primary={user.userId} style={{ marginLeft: '12px' }} />
            </ListItem>
          );
        })}
        <ListItem button>
          <Avatar src="aae" alt="Avatar" style={{ border: '2px solid red' }} />
          <ListItemText primary="spam" style={{ marginLeft: '12px' }} />
        </ListItem>
        <ListItem button>
          <Avatar src="aae" alt="Avatar" style={{ border: '2px solid red' }} />
          <ListItemText primary="spam" style={{ marginLeft: '12px' }} />
        </ListItem>
        <ListItem button>
          <Avatar src="aae" alt="Avatar" style={{ border: '2px solid red' }} />
          <ListItemText primary="spam" style={{ marginLeft: '12px' }} />
        </ListItem>
        <ListItem button>
          <Avatar src="aae" alt="Avatar" style={{ border: '2px solid red' }} />
          <ListItemText primary="spam" style={{ marginLeft: '12px' }} />
        </ListItem>
        <ListItem button>
          <Avatar src="aae" alt="Avatar" style={{ border: '2px solid red' }} />
          <ListItemText primary="spam" style={{ marginLeft: '12px' }} />
        </ListItem>
        <ListItem button>
          <Avatar src="aae" alt="Avatar" style={{ border: '2px solid red' }} />
          <ListItemText primary="spam" style={{ marginLeft: '12px' }} />
        </ListItem>
        <ListItem button>
          <Avatar src="aae" alt="Avatar" style={{ border: '2px solid red' }} />
          <ListItemText primary="spam" style={{ marginLeft: '12px' }} />
        </ListItem>
        <ListItem button>
          <Avatar src="aae" alt="Avatar" style={{ border: '2px solid red' }} />
          <ListItemText primary="spam" style={{ marginLeft: '12px' }} />
        </ListItem>
        <ListItem button>
          <Avatar src="aae" alt="Avatar" style={{ border: '2px solid red' }} />
          <ListItemText primary="spam" style={{ marginLeft: '12px' }} />
        </ListItem>
        <ListItem button>
          <Avatar src="aae" alt="Avatar" style={{ border: '2px solid red' }} />
          <ListItemText primary="spam" style={{ marginLeft: '12px' }} />
        </ListItem>
        <ListItem button>
          <Avatar src="aae" alt="Avatar" style={{ border: '2px solid red' }} />
          <ListItemText primary="spam" style={{ marginLeft: '12px' }} />
        </ListItem>
        <ListItem button>
          <Avatar src="aae" alt="Avatar" style={{ border: '2px solid red' }} />
          <ListItemText primary="spam" style={{ marginLeft: '12px' }} />
        </ListItem>
        <ListItem button>
          <Avatar src="aae" alt="Avatar" style={{ border: '2px solid red' }} />
          <ListItemText primary="spam" style={{ marginLeft: '12px' }} />
        </ListItem>
        <ListItem button>
          <Avatar src="aae" alt="Avatar" style={{ border: '2px solid red' }} />
          <ListItemText primary="spam" style={{ marginLeft: '12px' }} />
        </ListItem>{' '}
        <ListItem button>
          <Avatar src="aae" alt="Avatar" style={{ border: '2px solid red' }} />
          <ListItemText primary="spam" style={{ marginLeft: '12px' }} />
        </ListItem>
        <ListItem button>
          <Avatar src="aae" alt="Avatar" style={{ border: '2px solid red' }} />
          <ListItemText primary="spam" style={{ marginLeft: '12px' }} />
        </ListItem>
        <ListItem button>
          <Avatar src="aae" alt="Avatar" style={{ border: '2px solid red' }} />
          <ListItemText primary="spam" style={{ marginLeft: '12px' }} />
        </ListItem>
        <ListItem button>
          <Avatar src="aae" alt="Avatar" style={{ border: '2px solid red' }} />
          <ListItemText primary="spam" style={{ marginLeft: '12px' }} />
        </ListItem>
        <ListItem button>
          <Avatar src="aae" alt="Avatar" style={{ border: '2px solid red' }} />
          <ListItemText primary="spam" style={{ marginLeft: '12px' }} />
        </ListItem>
        <ListItem button>
          <Avatar src="aae" alt="Avatar" style={{ border: '2px solid red' }} />
          <ListItemText primary="spam" style={{ marginLeft: '12px' }} />
        </ListItem>
      </List>
    </Scrollbars>
  );
}
