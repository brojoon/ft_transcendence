
import { useCallback } from 'react';
import useSWR from 'swr';
import fetcher from './fetcher';
import { IDmList } from '@typings/db'

let DMList: any = undefined;
const getDMList = (() => {
	const { data } = useSWR<IDmList[]>('/api/dms/dmlist', fetcher);

	console.log('data', data);
	if (!DMList) {
		let tmp: number[] = [];
		data?.forEach((d) => {
			tmp.push(d.id);
		})
		DMList = tmp;
	}

	return DMList;
})

export default getDMList