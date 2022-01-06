import { IChatList, IChannelChatList } from '@typings/db';
import timezone from 'dayjs/plugin/timezone'
import dayjs from 'dayjs';

const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

export function makeSectionDM(chatList: IChatList[]) {
	const sections: { [key: string]: IChatList[] } = {};
	chatList.forEach((chat) => {
		let monthData = dayjs(chat.createdAt).format('YYYY-MM-DD');
		monthData += ' ' + days[dayjs(chat.createdAt).day()];
		if (Array.isArray(sections[monthData]))
			sections[monthData].push(chat);
		else
			sections[monthData] = [chat];
	})
	return sections;
}

export function makeSectionChannel(chatList: IChannelChatList[]) {
	const sections: { [key: string]: IChannelChatList[] } = {};
	chatList.forEach((chat) => {
		console.log(chat);
		let monthData = dayjs(chat.updatedAt).format('YYYY-MM-DD');
		monthData += ' ' + days[dayjs(chat.updatedAt).day()];
		console.log('monthData', monthData);
		if (Array.isArray(sections[monthData]))
			sections[monthData].push(chat);
		else
			sections[monthData] = [chat];
	})
	return sections;
}