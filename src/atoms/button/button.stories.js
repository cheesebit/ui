import React from 'react';

import { keys } from 'common/toolset';
import { setupDefaultStory, setupDerivedStory } from 'common/stories-toolset';
import Button, { Emphasis, Size } from './button';
import icons from '../icon/icon-mapping';

export default {
	title: 'Components/Atoms/Button',
	component: Button,
	argTypes: {
		onClick: {
			action: 'clicked',
			table: {
				disable: true,
			},
		},
		icon: {
			control: {
				type: 'select',
				options: keys( icons ),
			},
		},
	},
};

export function Playground( args ) {
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool Button ready to be played around. Try me :)
			</p>
			<Button { ...args } />
		</div>
	);
}

Playground.args = {
	children: 'Button',
};

export const Text = Playground.bind( {} );
Text.args = { ...Playground.args, emphasis: Emphasis.text, size: Size.medium };

export const Ghost = Playground.bind( {} );
Ghost.args = {
	...Playground.args,
	emphasis: Emphasis.ghost,
	size: Size.medium,
};

export const Flat = Playground.bind( {} );
Flat.args = { ...Playground.args, emphasis: Emphasis.flat, size: Size.medium };

setupDefaultStory( Playground );
setupDerivedStory( [ Text, Ghost, Flat ] );
