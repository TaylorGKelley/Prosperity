'use client';

import React from 'react';
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { CartesianGrid, XAxis, BarChart as RechartBarChart, Bar } from 'recharts';

type LineChartProps<T> = {
	config: ChartConfig;
	data: T[];
	XDataKey: keyof LineChartProps<T>['data'][number];
	YDataKey: keyof LineChartProps<T>['data'][number];
};

export default function BarChart<T>({ config, data, YDataKey, XDataKey }: LineChartProps<T>) {
	return (
		<ChartContainer config={config}>
			<RechartBarChart accessibilityLayer data={data}>
				<CartesianGrid vertical={false} />
				<XAxis dataKey={XDataKey.toString()} tickLine={false} tickMargin={10} axisLine={false} />
				<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
				<Bar dataKey={YDataKey.toString()} fill={config[YDataKey].color} radius={8} />
			</RechartBarChart>
		</ChartContainer>
	);
}
