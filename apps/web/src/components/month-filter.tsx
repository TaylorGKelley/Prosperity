'use client';

import { CalendarIcon, ChevronDownIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import useSearchParams from '@/hooks/useSearchParams';
import Format from '@/utils/Format';

export default function MonthFilter() {
	const searchParams = useSearchParams();
	const { year, month } = { year: searchParams.get('year'), month: searchParams.get('month') };

	const today = new Date();
	const selectedDate =
		year && month
			? new Date(
					parseInt(year),
					parseInt((month && parseInt(month) - 1)?.toString() || today.getMonth().toString()),
					1,
			  )
			: undefined;
	const displayDate = new Date(
		year ? parseInt(year) : today.getFullYear(),
		month ? parseInt(month) - 1 : today.getMonth(),
		1,
	);

	const yearItems = [];
	for (let i = today.getFullYear() - 4; i < today.getFullYear() + 6; i++) {
		yearItems.push(
			<SelectItem key={i} value={i.toString()} className='hover:bg-gray-500/50'>
				{i}
			</SelectItem>,
		);
	}

	return (
		<Popover>
			<PopoverTrigger>
				<div className='bg-white grid grid-cols-[auto_1fr_auto] gap-4 items-center p-4 rounded-lg shadow'>
					<CalendarIcon className='size-4' />
					<p>{Format.date(selectedDate || today).dateMonth}</p>
					<ChevronDownIcon className='size-4' />
				</div>
			</PopoverTrigger>
			<PopoverContent className='bg-white grid grid-cols-2 gap-4 border-none pt-2'>
				<div>
					<label htmlFor='month-select' className='text-xs text-gray-700'>
						Month:
					</label>
					<Select
						onValueChange={(value) => {
							searchParams.set('month', (parseInt(value) + 1).toString());
						}}
						defaultValue={displayDate.getMonth().toString()}>
						<SelectTrigger id='month-select' className='w-full border-gray-400'>
							<SelectValue placeholder='Month' />
						</SelectTrigger>
						<SelectContent className='bg-white'>
							<SelectItem value='0'>Jan</SelectItem>
							<SelectItem value='1'>Feb</SelectItem>
							<SelectItem value='2'>Mar</SelectItem>
							<SelectItem value='3'>Apr</SelectItem>
							<SelectItem value='4'>May</SelectItem>
							<SelectItem value='5'>Jun</SelectItem>
							<SelectItem value='6'>Jul</SelectItem>
							<SelectItem value='7'>Aug</SelectItem>
							<SelectItem value='8'>Sep</SelectItem>
							<SelectItem value='9'>Oct</SelectItem>
							<SelectItem value='10'>Nov</SelectItem>
							<SelectItem value='11'>Dec</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<label htmlFor='year-select' className='text-xs text-gray-700'>
						Year:
					</label>
					<Select
						onValueChange={(value) => {
							searchParams.set('year', value);
						}}
						defaultValue={displayDate.getFullYear().toString()}>
						<SelectTrigger id='year-select' className='w-full border-gray-400'>
							<SelectValue placeholder='Year' />
						</SelectTrigger>
						<SelectContent className='bg-white'>{yearItems}</SelectContent>
					</Select>
				</div>
			</PopoverContent>
		</Popover>
	);
}
