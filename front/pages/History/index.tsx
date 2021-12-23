import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Avatar from '@mui/material/Avatar';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { toast } from 'react-toastify';
import { IAllUser } from '@typings/db';
import {
  HistoryContainer,
  UserProfileContainer1,
  UserProfileContainer2,
  ProfileOneText,
  ProfileTwoText,
} from './style';

const option = {
  withCredentials: true,
};

const History = (data: any) => {
  const gameId = data.match.params.id;
  const [userId1, setUserId1] = useState('');
  const [userId2, setUserId2] = useState('');
  const [player1Point, setPlayer1Point] = useState(0);
  const [player2Point, setPlayer2Point] = useState(0);
  const [winner, setWinner] = useState(`${data.match.params.winner}`);
  const [userId1Nickname, setUserId1Nickname] = useState('');
  const [userId2Nickname, setUserId2Nickname] = useState('');
  const [winnerNickname, setWinnerNickname] = useState('');
  const [userId1Profile, setUserId1Profile] = useState('');
  const [userId2Profile, setUserId2Profile] = useState('');
  const { data: allUserList } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);

  useEffect(() => {
    if (userId1 && userId2) {
      allUserList?.map((user) => {
        if (user.userId === userId1) {
          setUserId1Profile(user.profile);
          setUserId1Nickname(user.username);
          if (winner === userId1) {
            setWinnerNickname(user.username);
          }
        } else if (user.userId === userId2) {
          setUserId2Profile(user.profile);
          setUserId2Nickname(user.username);
          if (winner === userId2) {
            setWinnerNickname(user.username);
          }
        }
      });
    }
  }, [userId1, userId2, winner]);

  useEffect(() => {
    async function getGameInfo() {
      await axios
        .get(`/api/game/history/${gameId}`, option)
        .then((res: any) => {
          setUserId1(res.data.userId1);
          setUserId2(res.data.userId2);
          setPlayer1Point(res.data.user1Point);
          setPlayer2Point(res.data.user2Point);
          setWinner(res.data.winner);
          // if (res.data.winner === null)
          //   window.location.href = `http://localhost:3000/history/${gameId}`;
        })
        .catch((error) => {
          toast.error(error.message, {
            autoClose: 4000,
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
          });
        });
    }
    if (userId1 === '') getGameInfo();
  }, [gameId, userId1]);

  return (
    <HistoryContainer>
      <div className="wrapper">
        <UserProfileContainer1>
          <Link to={`/users/${userId1Nickname}`}>
            <ListItem className="profile1-wrapper" button>
              <Avatar className="avatar1" src={userId1Profile} alt="Avatar" />
              <ProfileOneText winner={`${winner === userId1 ? 'white' : 'red'}`}>
                <span>{userId1Nickname}</span>
                <span>{player1Point} Point</span>
              </ProfileOneText>
            </ListItem>
          </Link>
        </UserProfileContainer1>
        <div>VS</div>
        <UserProfileContainer2>
          <Link to={`/users/${userId2Nickname}`}>
            <ListItem className="profile2-wrapper" button>
              <Avatar className="avatar2" src={userId2Profile} alt="Avatar" />
              <ProfileTwoText winner={`${winner === userId2 ? 'white' : 'red'}`}>
                <span>{userId2Nickname}</span>
                <span>{player2Point} Point</span>
              </ProfileTwoText>
            </ListItem>
          </Link>
        </UserProfileContainer2>
      </div>

      <div className="result-wrapper">
        <EmojiEventsIcon className="result-icon" />
        <div className="">승리자 : {winnerNickname ? winnerNickname : '무승부'}</div>
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
