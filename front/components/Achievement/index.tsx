import React, { useEffect, useState, VFC } from 'react';
import { IAchievement } from '@typings/db';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
      }}
    >
      <div
        style={{
          fontSize: '18px',
          fontWeight: 700,
          padding: '15px 15px',
          borderRadius: '3px 3px 0 0',
          backgroundColor: '#1e1e1e',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{header}</span>
          <div>
            <Icon />
          </div>
        </div>
        <span style={{ fontSize: '14px', color: '#bebebe', fontWeight: 600 }}>{condition}</span>
      </div>
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <div
          style={{
            zIndex: 15,
            position: 'absolute',
            right: '50%',
            transform: 'translateX(50%)',
            lineHeight: '22px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
          }}
        >
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
        <div
          style={{
            backgroundColor: '#253161',
            width: '100%',
            fontWeight: 500,
            borderRadius: '0 0 3px 3px',
            height: '23px',
          }}
        ></div>
      </div>
    </div>
  );
};

export default Achievement;