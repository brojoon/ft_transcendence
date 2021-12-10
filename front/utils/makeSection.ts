import { IChatList } from '@typings/db';
import dayjs from 'dayjs';

export default function makeSection(chatList: IChatList[]) {
	const sections: { [key: string]: IChatList[] } = {};
	chatList.forEach((chat) => {
		const monthData = dayjs(chat.createdAt).format('YYYY-MM-DD');
		if (Array.isArray(sections[monthData]))
			sections[monthData].push(chat);
		else
			sections[monthData] = [chat];
	})
	return sections;
}