import React, { VFC, useState } from 'react';
import { IUser } from '@typings/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { UserMatchesContainer, UserMatchesListWrapper, UserMatchesResult } from './style';
import TablePagination from '@mui/material/TablePagination';
import SentimentVeryDissatisfiedSharpIcon from '@mui/icons-material/SentimentVeryDissatisfiedSharp';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import { IUserGameHistory } from '@typings/db';

interface Props {
  userData: IUser | null | undefined;
}

const UserMatches: VFC<Props> = ({ userData }) => {
  const { data: userGameHistory } = useSWR<IUserGameHistory[]>(
    `/api/game/history/userGameHistory/${userData?.userId}`,
    fetcher,
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (e: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <UserMatchesContainer>
      <div className="profile-matches-header">Matches</div>
      {userGameHistory?.map((history, index) => {
        if (index >= rowsPerPage * (page + 1)) return;
        if (page > 0) {
          if (index < rowsPerPage * page) return;
        }
        return (
          <UserMatchesListWrapper>
            <Link to={`/game/history/${history?.historyId}`}>
              <List className="list-item-wrapper">
                <Avatar className="avatar" src={userData?.profile} alt="Avatar" />
                <div className="matches-text">
                  <UserMatchesResult textColor={history?.isWinner ? '#ffe937' : '#ec443b'}>
                    {history?.isWinner ? 'Won' : 'Lost'}
                    <span className="opponent-text"> against {history?.opponent}</span>
                  </UserMatchesResult>
                  <span className="">{history?.myPoint + ' - ' + history?.opponentPoint}</span>
                </div>

                {history?.isWinner ? (
                  <SentimentVerySatisfiedIcon className="user-matches-icon-win" />
                ) : (
                  <SentimentVeryDissatisfiedSharpIcon className="user-matches-icon-lose" />
                )}
              </List>
            </Link>
          </UserMatchesListWrapper>
        );
      })}
      <div className="profile-pagination-wrapper">
        <TablePagination
          component="div"
          count={userGameHistory ? userGameHistory?.length : 0}
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
