import React, { VFC, useState } from 'react';
import { IUser } from '@typings/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { UserMatchesContainer, UserMatchesListWrapper } from './style';
import TablePagination from '@mui/material/TablePagination';
import SentimentVeryDissatisfiedSharpIcon from '@mui/icons-material/SentimentVeryDissatisfiedSharp';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

interface Props {
  userData: IUser | null | undefined;
}

const UserMatches: VFC<Props> = ({ userData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (e: any, newPage: any) => {
    console.log('setpage', newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: any) => {
    console.log('setRowsPerPage', e.target.value);
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  let count = 53;
  const arr = new Array(count).fill(0);
  return (
    <UserMatchesContainer>
      <div className="profile-matches-header">Matches</div>
      {arr?.map((user, index) => {
        if (index >= rowsPerPage * (page + 1)) return;
        if (page > 0) {
          if (index < rowsPerPage * page) return;
        }
        return (
          <UserMatchesListWrapper>
            <Link to={`/users/${userData?.userId}`}>
              <List className="list-item-wrapper">
                <Avatar className="avatar" src={userData?.profile} alt="Avatar" />
                <span className="user-text">{userData?.userId}</span>
                {index}
                <SentimentVerySatisfiedIcon className="user-matches-icon-win" />
                <SentimentVeryDissatisfiedSharpIcon className="user-matches-icon-lose" />
              </List>
            </Link>
          </UserMatchesListWrapper>
        );
      })}
      <div className="profile-pagination-wrapper">
        <TablePagination
          component="div"
          count={53}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ color: 'white' }}
        />
      </div>
    </UserMatchesContainer>
  );
};

export default UserMatches;
