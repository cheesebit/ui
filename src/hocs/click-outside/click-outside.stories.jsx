import React from 'react';
import { useValue } from '@cheesebit/use-value';

import { Input } from 'atoms/input';
import { withForwardedRef } from '../with-forwarded-ref';
import ClickOutside from './click-outside';

export default {
	title: 'HOCs/ClickOutside',
	component: ClickOutside,
	argTypes: {
		children: {
			table: {
				disable: true,
			},
		},
		onClickOutside: {
			table: {
				disable: true,
			},
		},
	},
};

export function Playground(args) {
	const outside = useValue(true);

	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool ClickOutside HOC ready to be played around. Try me :)
			</p>

			<ClickOutside {...args} onClickOutside={() => outside(true)}>
				{({ ref }) => {
					return (
						<div className="flex flex-col w-64 mx-auto">
							<Input
								ref={ref}
								className="h-8"
								onFocus={() => {
									outside(false);
								}}
								type="text"
							/>
							<p>{outside() ? 'Outside' : 'Inside'}</p>
						</div>
					);
				}}
			</ClickOutside>
		</div>
	);
}
