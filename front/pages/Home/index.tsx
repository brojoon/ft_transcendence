import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { Container } from './style';
import { useHistory } from 'react-router-dom';
import IntroduceModal from '@components/IntroduceModal';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { useMediaQuery } from 'react-responsive';
const introduce =
  '이사이트는 42SEOUL에서 진행한 Socket.io 이용해 REAL-TIME, Multiplayer Online Pong game을 즐길수 있는 웹사이트를 구현한 프로젝트 입니다.  \
   DM과 채널을 이용하여 실시간 채팅을 나눌수 있으며 접속중인 유저가 2명 이상 이라면 서로 Pong게임을 즐길수 있습니다.';

const Home = () => {
  const [isIntroduceModal, setIsIntroduceModal] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const history = useHistory();

  const onClickIntroduceToggle = useCallback((e) => {
    e.preventDefault();
    setIsIntroduceModal((prev) => !prev);
  }, []);

  const onClickQuickPlay = useCallback((e) => {
    e.preventDefault();
    history.push('/game');
  }, []);

  return (
    <Container ismobile={isMobile}>
      {isIntroduceModal && (
        <IntroduceModal
          headerContent="INTRODUCE"
          content={introduce}
          onClickIntroduceToggle={onClickIntroduceToggle}
        />
      )}
      <h1 className="header">ft_transcendence</h1>
      <h3 className="header-sub">mighty pong contest</h3>
      <div className="btn-wrapper">
        <button className="introduce-btn" onClick={onClickIntroduceToggle}>
          INTRODUCE &nbsp;
          <TextSnippetIcon className="Intro-icon" />
        </button>
        {!isMobile  &&
          <button className="quick-play-btn" onClick={onClickQuickPlay}>
            QUICK-PLAY &nbsp;
            <PlayCircleFilledWhiteIcon className="quick-icon" />
          </button>
        }
      </div>
    </Container>
  );
};

export default Home;
