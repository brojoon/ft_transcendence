import React, { createContext, useState, VFC } from 'react';

interface State {
  userId: string;
  username: string;
}

export const SocketContext = createContext<{
  onlineList: State[] | null;
  setOnlineList: React.Dispatch<React.SetStateAction<State[] | null>>;
  onGameList: State[] | null;
  setOnGameList: React.Dispatch<React.SetStateAction<State[] | null>>;
}>({} as any);

const SocketStore = ({ children }: { children: React.ReactNode }) => {
  const [onlineList, setOnlineList] = useState<State[] | null>(null);
  const [onGameList, setOnGameList] = useState<State[] | null>(null);

  return (
    <SocketContext.Provider value={{ onlineList, setOnlineList, onGameList, setOnGameList }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketStore;
