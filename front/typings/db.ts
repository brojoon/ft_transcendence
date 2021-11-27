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
export interface IDmList {
  id: number,
  userId: string,
  username: string,
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

export interface IChannelChatList {
  userId: string | undefined,
  message: string,
  updatedAt: Date,
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

export interface IChannelList2 {
  id: number,
  name: string,
  type: number,
  authId: string | undefined,
  password: null,
  createdAt: Date,
  updatedAt: Date,
  deleteAt: null
}

// export interface IMember {
//   userId: string,
//   mute: boolean,
//   auth: number
// }

export interface IMemberList {
  userId: string,
  channelId: number,
  mute: false,
  auth: number,
  createAt: Date,
  updatedAt: Date,
  muteExpired: Date,

}

export interface IFriendList {
  userId2: string,
}

export interface IBlockList {
  userId2: string,
}

export interface IAchievement {
  number: number,
  star: number,
  time: Date,
}