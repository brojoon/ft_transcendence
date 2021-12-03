import React, { useEffect, useState, VFC } from 'react';
import { IAchievement } from '@typings/db';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { Container, AchieveBody } from './style';

interface Props {
  curValue: IAchievement | undefined;
  maxCount: number;
  Icon: any;
  header: string;
  condition: string;
}

dayjs.locale('ko');

const Achievement: VFC<Props> = ({ Icon, curValue, maxCount, header, condition }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      if (curValue?.number) {
        if (maxCount <= curValue?.number && curValue?.star >= maxCount / 5) {
          return;
        } else if (progress < curValue?.number) {
          console.log('curValue?.number', curValue?.number);
          setProgress((prev) => prev + 1);
        } else if (progress > curValue?.number) {
          setProgress((prev) => prev - 1);
        }
      }
    }, 40);
  }, [progress, curValue, maxCount]);
  return (
    <Container>
      <div className="achieve-header">
        <div className="header">
          <span>{header}</span>
          <div>
            <Icon />
          </div>
        </div>
        <span className="content">{condition}</span>
      </div>
      <AchieveBody style={{ position: 'relative', textAlign: 'center' }}>
        <div className="progress-text">
          {curValue && (curValue?.star >= maxCount / 5 || curValue.number >= maxCount)
            ? dayjs(curValue.time).format('YYYY. MM. DD. A HH:mm:ss')
            : progress + ' / ' + maxCount}
        </div>
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            backgroundColor: '#365dff',
            fontWeight: 500,
            borderRadius: '0 0 3px 3px',

            width: `${
              curValue && (curValue?.star >= maxCount / 5 || curValue?.number >= maxCount)
                ? '100'
                : (progress / maxCount) * 100
            }%`,
            height: '23px',
            textAlign: 'center',
            transition: 'all ease-out 0.5s',
          }}
        ></div>
        <div className="progress-background"></div>
      </AchieveBody>
    </Container>
  );
};

export default Achievement;
