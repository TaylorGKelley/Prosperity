import React from 'react';

type DonutProgressChartProps = {
	percentage: `${number}%`;
};

export default function DonutProgressChart({ percentage }: DonutProgressChartProps) {
	const arc = parseInt(percentage) / 100;

	const cir = 2 * 3.1415 * 87;
	const dashArr = arc * cir;

	return (
		<div className='relative w-min'>
			<svg
				width='216'
				height='216'
				viewBox='0 0 216 216'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<g filter='url(#filter0_dd_115_886)' transform='rotate(-90 106 106)'>
					<circle
						cx='108'
						cy='108'
						r='87'
						stroke='currentColor'
						strokeWidth='30'
						className='text-gray-100'
					/>
				</g>
				<g filter='url(#filter0_dd_115_886)' transform='rotate(-90 106 106)'>
					<circle
						cx='108'
						cy='108'
						r='87'
						stroke='currentColor'
						className='text-amber-600 animate-stroke-dash animate'
						style={{
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-expect-error
							'--percentage': dashArr,
							'--circumference': cir,
						}}
						strokeWidth='30'
						strokeLinecap='round'
						// strokeDasharray={`${dashArr} ${cir}`}
						strokeDashoffset='0'
					/>
				</g>
				<circle cx='108' cy='17' r='6' fill='white' />
				<defs>
					<filter
						id='filter0_dd_115_886'
						x='0.5'
						y='1.5'
						width='210'
						height='210'
						filterUnits='userSpaceOnUse'
						colorInterpolationFilters='sRGB'>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feColorMatrix
							in='SourceAlpha'
							type='matrix'
							values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
							result='hardAlpha'
						/>
						<feOffset dy='1' />
						<feGaussianBlur stdDeviation='1' />
						<feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0' />
						<feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_115_886' />
						<feColorMatrix
							in='SourceAlpha'
							type='matrix'
							values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
							result='hardAlpha'
						/>
						<feOffset dy='1' />
						<feGaussianBlur stdDeviation='1.5' />
						<feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0' />
						<feBlend
							mode='normal'
							in2='effect1_dropShadow_115_886'
							result='effect2_dropShadow_115_886'
						/>
						<feBlend
							mode='normal'
							in='SourceGraphic'
							in2='effect2_dropShadow_115_886'
							result='shape'
						/>
					</filter>
					<filter
						id='filter1_dd_115_886'
						x='0.5'
						y='0.5'
						width='210'
						height='210'
						filterUnits='userSpaceOnUse'
						colorInterpolationFilters='sRGB'>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feColorMatrix
							in='SourceAlpha'
							type='matrix'
							values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
							result='hardAlpha'
						/>
						<feOffset dy='1' />
						<feGaussianBlur stdDeviation='1' />
						<feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0' />
						<feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_115_886' />
						<feColorMatrix
							in='SourceAlpha'
							type='matrix'
							values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
							result='hardAlpha'
						/>
						<feOffset />
						<feGaussianBlur stdDeviation='1.5' />
						<feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0' />
						<feBlend
							mode='normal'
							in2='effect1_dropShadow_115_886'
							result='effect2_dropShadow_115_886'
						/>
						<feBlend
							mode='normal'
							in='SourceGraphic'
							in2='effect2_dropShadow_115_886'
							result='shape'
						/>
					</filter>
				</defs>
			</svg>
			<div className='absolute top-1/2 left-1/2 -translate-1/2 text-center'>
				<p className='font-semibold'>$2300.10</p>
				<p className='text-gray-500 font-medium text-sm'>Spent</p>
			</div>
		</div>
	);
}
