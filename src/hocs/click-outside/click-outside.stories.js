import React from 'react';

import { Input } from 'atoms/input';
import { useValue } from '../../hooks/value';
import { withForwardedRef } from '../with-forwarded-ref';
import ClickOutside from './click-outside';

const InputWithRef = withForwardedRef( Input );

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

export function Playground( args ) {
	const outside = useValue( true );

	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool ClickOutside HOC ready to be played around. Try me :)
			</p>

			<ClickOutside { ...args } onClickOutside={ () => outside( true ) }>
				{ ( { ref } ) => {
					return (
						<div className="flex flex-col w-64 mx-auto">
							<InputWithRef
								ref={ ref }
								className="h-8 border"
								onFocus={ () => {
									outside( false );
								} }
								type="text"
							/>
							<p>{ outside() ? 'Outside' : 'Inside' }</p>
						</div>
					);
				} }
			</ClickOutside>
		</div>
	);
}
