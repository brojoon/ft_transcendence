import React, { VFC } from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { IAchievement, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { UserStatisticsContainer } from './style';

interface Props {
  userData: IUser | undefined | null;
}

const UserStatistics: VFC<Props> = ({ userData }) => {
  const { data: winCount } = useSWR<IAchievement>(`/api/game/achievement/numOfWin`, fetcher);
  const { data: loseCount } = useSWR<IAchievement>(`/api/game/achievement/numOfLose`, fetcher);
  return (
    <UserStatisticsContainer>
      <div className="statistics-header">Statistics</div>
      <div className="statistics-count-wrapper ">
        <EmojiEventsIcon className="statistics-match-icon" />
        <div className="statistics-match-text">
          <span>Win Count</span>
          {/* <span>{loseCount?.number}</span> */}
        </div>
      </div>
      <div className="statistics-count-wrapper ">
        <EventBusyIcon className="statistics-match-icon" />
        <div className="statistics-match-text">
          <span>Loss Count</span>
          {/* <span>{loseCount?.number}</span> */}
        </div>
      </div>
    </UserStatisticsContainer>
  );
};

export default UserStatistics;
