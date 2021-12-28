import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import getSocket from '@utils/useSocket';
import 'regenerator-runtime';
import { useHistory, useParams } from 'react-router-dom';
import useInput from '@hooks/useInput';
import { IUser, IAllUser } from '@typings/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Scrollbars from 'react-custom-scrollbars';
import GamePixiContainer from '@components/GamePixiContainer';
import GameSetting from '@components/GameSetting';
import { toast } from 'react-toastify';
import {
  PingPongContainer,
  GameReadyContainer,
  UserPointContainer,
  GameInitBtnContainer,
  BackgroundHeight,
  ScrollbarColor,
} from './style';

const socket = getSocket();
const option = {
  withCredentials: true,
};

const PingPong = () => {
  const { id } = useParams<{ id: string }>();
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher);
  const { data: allUserList } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);
  const [player1Ready, setPlay1Ready] = useState(0);
  const [player2Ready, setPlay2Ready] = useState(0);
  const [user1Point, setUser1Point] = useState(0);
  const [user2Point, setUser2Point] = useState(0);
  const [player, setPlayer] = useState('');
  const [isGameStart, setIsGameStart] = useState(false);
  const [opponent, setOpponent] = useState('');
  const [opponentName, setOpponentName] = useState('');
  const [opponentProfile, setOpponentProfile] = useState('');
  const [mapSelect, setMapSelect] = useState(0);
  const [watchUserId1, setWatchUserId1] = useState('');
  const [watchUserId2, setWatchUserId2] = useState('');
  const [watchUserId1Profile, setWatchUserId1Profile] = useState('');
  const [watchUserId2Profile, setWatchUserId2Profile] = useState('');
  const [watchUserId1Name, setWatchUserId1Name] = useState('');
  const [watchUserId2Name, setWatchUserId2Name] = useState('');
  const [gameStartBtn, setGameStartBtn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    socket.on('gameStart', (isGameStart: { gameStart: boolean }) => {
      if (isGameStart.gameStart) {
        setIsGameStart(true);
        setPlay1Ready(1);
        setPlay2Ready(1);
      }
      return () => {
        socket.off('gameStart');
      };
    });
  }, [socket]);

  useEffect(() => {
    if (id) {
      socket.emit('gameCheck', {
        gameId: id,
      });
    }
  }, [id, socket]);

  useEffect(() => {
    if (myData && id) {
      socket.emit('onGame', {
        gameId: id,
        player: myData.userId,
      });
    }
    return () => {
      if (myData) {
        socket.emit('offGame', {
          gameId: id,
          player: myData.userId,
        });
      }
    };
  }, [socket, myData, id]);

  useEffect(() => {
    if (myData) {
      allUserList?.map((user) => {
        if (user.userId === opponent) {
          setOpponentProfile(user.profile);
          setOpponentName(user.username);
        }
        if (user.userId === watchUserId1) {
          setWatchUserId1Profile(user.profile);
          setWatchUserId1Name(user.username);
        }
        if (user.userId === watchUserId2) {
          setWatchUserId2Profile(user.profile);
          setWatchUserId2Name(user.username);
        }
      });
    }
  }, [myData, opponent, allUserList, watchUserId1, watchUserId2]);

  // 내정보 받아오고 => 게임 기록 가져오고 => 내정보와 userId 매칭후 player one인지 two인지 확인
  // playerOne인 경우 게임 리셋하고 게임포인트 집어 넣기
  useEffect(() => {
    async function getGameInfo() {
      await axios
        .get(`/api/game/history/${id}`, option)
        .then((res: any) => {
          if (res.data.state === 2) history.push(`/game/history/${id}`);
          if (myData?.userId === res.data.userId1) {
            setPlayer('playerOne');
            setOpponent(res.data.userId2);
            setPlay2Ready(res.data.playerTwoJoin);

            socket.emit('game', {
              gameId: id,
              player: 'playerOne',
              player1Ready: 0,
              player2Ready: res.data.playerTwoJoin,
            });
          } else if (myData?.userId === res.data.userId2) {
            setPlayer('playerTwo');
            setPlay1Ready(res.data.playerOneJoin);
            setOpponent(res.data.userId1);
            socket.emit('game', {
              gameId: id,
              player: 'playerTwo',
              player1Ready: res.data.playerOneJoin,
              player2Ready: 0,
            });
          } else {
            socket.emit('game', {
              gameId: id,
              player: '',
              player1Ready: res.data.playerOneJoin,
              player2Ready: res.data.playerTwoJoin,
            });
          }

          setWatchUserId1(res.data.userId1);
          setWatchUserId2(res.data.userId2);
          socket.emit('changeGameSet', { gameId: id, check: 'check' });
          socket.emit('gamePoint', {
            gameId: id,
            user1Point: res.data.user1Point,
            user2Point: res.data.user2Point,
          });
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
          setTimeout(() => {
            history.push('/home');
          }, 4000);
        });
    }
    if (myData?.userId) getGameInfo();
  }, [id, myData]);

  useEffect(() => {
    socket.on('point', (point: any) => {
      setUser1Point(point.player1);
      setUser2Point(point.player2);
    });
    return () => {
      socket.off('point');
    };
  }, []);

  useEffect(() => {
    socket.on('end', () => {
      history.push(`/game/history/${id}`);
    });
    return () => {
      socket.off('end');
    };
  }, [id]);

  useEffect(() => {
    socket.on('ready', (ready: any) => {
      setPlay1Ready(ready.player1);
      setPlay2Ready(ready.player2);

      if (ready.player1 === 1 && ready.player2 === 1) setGameStartBtn(true);
    });
    return () => {
      socket.off('ready');
    };
  }, []);

  const readyPlayer1 = useCallback(() => {
    if (player === 'playerOne' && player1Ready === 0) {
      socket.emit('gameReady', {
        gameId: id,
        player: 1,
        userId: myData?.userId,
      });
    }
  }, [socket, id, myData, player, player1Ready]);
  const readyPlayer2 = useCallback(() => {
    if (player === 'playerTwo' && player2Ready === 0) {
      socket.emit('gameReady', {
        gameId: id,
        player: 2,
        userId: myData?.userId,
      });
    }
  }, [socket, id, myData, player, player2Ready]);

  const changeGameSet = useCallback(() => {
    if (player !== '')
      axios.get(`/api/game/start/${id}`, option).catch((error) => {
        history.push('./home');
        toast.error(error.message, {
          autoClose: 4000,
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: 'colored',
        });
      });
  }, [id, player, option]);

  return (
    <BackgroundHeight className="bg">
      <Scrollbars
        autoHide
        renderThumbVertical={({ style, ...props }) => <ScrollbarColor {...props} />}
      >
        <PingPongContainer>
          {isGameStart && (
            <GamePixiContainer
              mapSelect={mapSelect}
              player={player}
              setGameStartBtn={setGameStartBtn}
            />
          )}
          {!isGameStart && (
            <GameSetting
              player1Ready={player1Ready}
              player2Ready={player2Ready}
              player={player}
              mapSelect={mapSelect}
              setMapSelect={setMapSelect}
            />
          )}
          {!isGameStart && (
            <GameReadyContainer>
              <div className="player-one-container">
                <div>
                  <Avatar className="player-one-avatar" src={watchUserId1Profile} alt="Avatar" />
                </div>
                <div className="player-one-text">
                  {player === 'playerOne'
                    ? myData?.username + ' (나)'
                    : player !== ''
                    ? opponentName + ' (상대편)'
                    : watchUserId1Name}
                </div>
                <div>
                  {player === 'playerOne' ? (
                    player1Ready === 0 ? (
                      <Button variant="contained" onClick={readyPlayer1}>
                        ready
                      </Button>
                    ) : (
                      <Button variant="contained" disabled>
                        완료
                      </Button>
                    )
                  ) : player1Ready === 0 ? (
                    <Button variant="contained" disabled>
                      준비중..
                    </Button>
                  ) : (
                    <Button variant="contained" disabled>
                      완료
                    </Button>
                  )}
                </div>
              </div>
              <div className="versus">
                <div>VS</div>
              </div>
              <div className="player-two-container">
                <div>
                  <Avatar className="player-two-avatar" src={watchUserId2Profile} alt="Avatar" />
                </div>
                <div className="player-two-text">
                  {player === 'playerTwo'
                    ? myData?.username + ' (나)'
                    : player !== ''
                    ? opponentName + ' (상대편)'
                    : watchUserId2Name}
                </div>
                <div>
                  {player === 'playerTwo' ? (
                    player2Ready === 0 ? (
                      <Button variant="contained" onClick={readyPlayer2}>
                        ready
                      </Button>
                    ) : (
                      <Button variant="contained" disabled>
                        완료
                      </Button>
                    )
                  ) : player2Ready === 0 ? (
                    <Button variant="contained" disabled>
                      준비중..
                    </Button>
                  ) : (
                    <Button variant="contained" disabled>
                      완료
                    </Button>
                  )}
                </div>
              </div>
            </GameReadyContainer>
          )}

          <UserPointContainer>
            {isGameStart && (
              <div className="point-wrapper">
                {watchUserId1Name + ' Point'}
                <EventNoteIcon className="point-icon" /> {': [ ' + user1Point + ' ] '}
              </div>
            )}
            {isGameStart && (
              <div className="point-wrapper">
                {watchUserId2Name + ' Point'}
                <EventNoteIcon className="point-icon" /> {': [ ' + user2Point + ' ] '}
              </div>
            )}
          </UserPointContainer>
          <GameInitBtnContainer width={`${isGameStart ? '' : '100%'}`}>
            {player === '' ? null : gameStartBtn ? (
              <Button className="game-btn" variant="contained" onClick={changeGameSet}>
                게임시작
              </Button>
            ) : (
              <Button className="game-btn" variant="contained" disabled>
                게임시작
              </Button>
            )}
            {player === '' ? null : isGameStart ? null : (
              <div className="game-text"> (모두 레디 시 시작됨)</div>
            )}
            {player === '' ? <h2>관전중...</h2> : <div>(up: w / down: s)</div>}
          </GameInitBtnContainer>
        </PingPongContainer>
      </Scrollbars>
    </BackgroundHeight>
  );
};

export default PingPong;
