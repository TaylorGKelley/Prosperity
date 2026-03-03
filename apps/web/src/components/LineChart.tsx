'use client';

import React from 'react';
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { CartesianGrid, XAxis, Line, LineChart as RechartLineChart } from 'recharts';

type LineChartProps<T> = {
	config: ChartConfig;
	data: T[];
	XDataKey: keyof LineChartProps<T>['data'][number];
	YDataKey: keyof LineChartProps<T>['data'][number];
};

export default function LineChart<T>({ config, data, YDataKey, XDataKey }: LineChartProps<T>) {
	return (
		<ChartContainer config={config}>
			<RechartLineChart
				accessibilityLayer
				data={data}
				margin={{
					left: 12,
					right: 12,
				}}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey={XDataKey.toString()}
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
				<Line
					dataKey={YDataKey.toString()}
					type='natural'
					stroke={config[YDataKey].color}
					strokeWidth={2}
					dot={false}
				/>
			</RechartLineChart>
		</ChartContainer>
	);
}
