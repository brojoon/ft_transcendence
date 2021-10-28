import axios from 'axios';
import React from 'react';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  return (
    <div>
      home
      <ToastContainer />
    </div>
  );
};

export default Home;
