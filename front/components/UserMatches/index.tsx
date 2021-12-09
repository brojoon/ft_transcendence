import React, { VFC, useState } from 'react';
import { IUser } from '@typings/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { UserMatchesContainer } from './style';
import TablePagination from '@mui/material/TablePagination';
import SentimentVeryDissatisfiedSharpIcon from '@mui/icons-material/SentimentVeryDissatisfiedSharp';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

const ProfileTablePagination = () => {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (e: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      style={{ color: 'white' }}
    />
  );
};

interface Props {
  userData: IUser | null | undefined;
}

const UserMatches: VFC<Props> = ({ userData }) => {
  return (
    <UserMatchesContainer>
      <div className="profile-matches-header">Matches</div>
      <div>
        <Link to={`/users/${userData?.userId}`}>
          <List>
            <ListItem className="list-item-wrapper" button>
              <Avatar className="avatar" src={userData?.profile} alt="Avatar" />
              <ListItemText className="user" primary={userData?.userId} />
              <SentimentVerySatisfiedIcon />
            </ListItem>
          </List>
        </Link>
      </div>
      <div className="profile-pagination-wrapper">
        <ProfileTablePagination />
      </div>
    </UserMatchesContainer>
  );
};

export default UserMatches;
