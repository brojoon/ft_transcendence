import React, { VFC } from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { IUserMatches, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import GradeIcon from '@mui/icons-material/Grade';
import { UserStatisticsContainer } from './style';

interface Props {
  userData: IUser | undefined | null;
}

const UserStatistics: VFC<Props> = ({ userData }) => {
  const { data: MatchesCount } = useSWR<IUserMatches>(
    `/api/game/history/userWinLoseFight/${userData?.userId}`,
    fetcher,
  );

  return (
    <UserStatisticsContainer>
      <div className="statistics-header">Statistics</div>
      <div className="statistics-count-wrapper ">
        <GradeIcon className="statistics-match-icon" />
        <div className="statistics-match-text">
          <span>RATING</span>
          <span>
            {MatchesCount &&
              (2000 + (MatchesCount?.numOfWin - MatchesCount?.numOfLose) * 14 < 0
                ? 0
                : 2000 + (MatchesCount?.numOfWin - MatchesCount?.numOfLose) * 14)}
          </span>
        </div>
      </div>
      <div className="statistics-count-wrapper ">
        <EmojiEventsIcon className="statistics-match-icon" />
        <div className="statistics-match-text">
          <span>Win Count</span>
          <span>{MatchesCount?.numOfWin}</span>
        </div>
      </div>
      <div className="statistics-count-wrapper ">
        <EventBusyIcon className="statistics-match-icon" />
        <div className="statistics-match-text">
          <span>Loss Count</span>
          <span>{MatchesCount?.numOfLose}</span>
        </div>
      </div>
    </UserStatisticsContainer>
  );
};

export default UserStatistics;
