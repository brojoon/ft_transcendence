import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import getCookie from '@utils/cookie';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Avatar from '@mui/material/Avatar';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IAllUser } from '@typings/db';
import {
  HistoryContainer,
  UserProfileContainer1,
  UserProfileContainer2,
  ProfileOneText,
  ProfileTwoText,
} from './style';

const option = {
  headers: {
    Authorization: `Bearer ${getCookie('ts_token', 1)}`,
  },
  withCredentials: true,
};

const History = (data: any) => {
  const gameId = data.match.params.id;
  const [userId1, setUserId1] = useState('');
  const [userId2, setUserId2] = useState('');
  const [player1Point, setPlayer1Point] = useState(0);
  const [player2Point, setPlayer2Point] = useState(0);
  const [winner, setWinner] = useState(`${data.match.params.winner}`);
  const [userId1Profile, setUserId1Profile] = useState('');
  const [userId2Profile, setUserId2Profile] = useState('');
  const { data: allUserList } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);

  useEffect(() => {
    if (userId1 && userId2) {
      allUserList?.map((user) => {
        if (user.userId === userId1) {
          setUserId1Profile(user.profile);
        } else if (user.userId === userId2) {
          setUserId2Profile(user.profile);
        }
      });
    }
  }, [userId1, userId2]);

  useEffect(() => {
    async function getGameInfo() {
      await axios
        .get(`http://localhost:3095/api/game/history/${gameId}`, option)
        .then((res: any) => {
          setUserId1(res.data.userId1);
          setUserId2(res.data.userId2);
          setPlayer1Point(res.data.user1Point);
          setPlayer2Point(res.data.user2Point);
          setWinner(res.data.winner);
          // if (res.data.winner === null)
          //   window.location.href = `http://localhost:3000/history/${gameId}`;
        })
        .catch(() => {});
    }
    if (userId1 === '') getGameInfo();
  }, [gameId, userId1]);

  return (
    <HistoryContainer>
      <div className="wrapper">
        <UserProfileContainer1>
          <Link to={`/users/${userId1}`}>
            <ListItem className="profile1-wrapper" button>
              <Avatar className="avatar1" src={userId1Profile} alt="Avatar" />
              <ProfileOneText winner={`${winner === userId1 ? 'white' : 'red'}`}>
                <span>{userId1}</span>
                <span>{player1Point} Point</span>
              </ProfileOneText>
            </ListItem>
          </Link>
        </UserProfileContainer1>
        <div>VS</div>
        <UserProfileContainer2>
          <Link to={`/users/${userId2}`}>
            <ListItem className="profile2-wrapper" button>
              <Avatar className="avatar2" src={userId2Profile} alt="Avatar" />
              <ProfileTwoText winner={`${winner === userId2 ? 'white' : 'red'}`}>
                <span>{userId2}</span>
                <span>{player2Point} Point</span>
              </ProfileTwoText>
            </ListItem>
          </Link>
        </UserProfileContainer2>
      </div>

      <div className="result-wrapper">
        <EmojiEventsIcon className="result-icon" />
        <div className="">승리자 : {winner}</div>
      </div>
      <div>
        <Link to="/game">
          <Button variant="contained"> 매치 페이지로 이동 </Button>
        </Link>
      </div>
    </HistoryContainer>
  );
};

export default History;
