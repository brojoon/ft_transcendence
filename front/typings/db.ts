export interface IUser {
  userId: string;
  username: string;
  oauthId: number;
  email: string;
  profile: string;
}

export interface IAllUser {
  userId: string;
  username: string;
  email: string;
  profile: string;
}

export interface IDmcontents {
  userId1: string;
  userId2: string;
}

export interface IDmList {
  id: number,
  Dmcontents: IDmcontents[];
}

export interface IChatList {
  id: number,
  dmId: number,
  userId1: string | undefined,
  userId2: string | undefined,
  message: string,
  match: number,
  createdAt: Date,
  updatedAt: Date,
  historyId: number,
}

export interface IChannelList {
  id: number,
  name: string,
  type: number,
  authId: string | undefined,
  createdAt: Date,
  updatedAt: Date,
  deleteAt: null
}

export interface IMember {
  userid: string,
  mute: boolean,
  auth: number
}

export interface IMemberList {
  id: number,
  name: string,
  type: number,
  createAt: Date,
  updatedAt: Date,
  deleteAt: null,
  Chatmembers: IMember[],

}