'use client';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

type MonthlySpendingBarChartProps = {
	data: { month: string; spent: number; income: number }[];
};

export default function MonthlySpendingBarChart({ data }: MonthlySpendingBarChartProps) {
	return (
		<ChartContainer
			config={{
				spent: {
					label: 'Spent',
					color: 'var(--color-blue-500)',
				},
				income: {
					label: 'Income',
					color: 'var(--color-blue-100)',
				},
			}}
			className='w-full h-28 min-h-48'>
			<BarChart accessibilityLayer data={data}>
				{/* <CartesianGrid vertical={false} /> */}
				<XAxis
					dataKey='month'
					tickLine={false}
					tickMargin={10}
					// axisLine={false}
					axisLine={{ strokeWidth: 0.5, className: 'mt-3' }}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<YAxis
					tickLine={false}
					axisLine={false}
					tickFormatter={(value: number) => `${value / 1000}k`}
					padding={{ bottom: 4 }}
				/>
				<ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dashed' />} />
				<Bar dataKey='income' fill='var(--color-blue-100)' radius={6} barSize={16} />
				<Bar dataKey='spent' fill='var(--color-blue-500)' radius={6} barSize={16} />
			</BarChart>
		</ChartContainer>
	);
}
