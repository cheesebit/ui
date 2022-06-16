import React from 'react';

import { keys } from 'common/toolset';
import { setupDefaultStory, setupDerivedStory } from 'common/stories-toolset';
import Button from './button';
import icons from '../icon/icon-mapping';
import generator from 'test/data-generator';

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
			options: keys( icons ),
			control: {
				type: 'select',
			},
		},
		leading: {
			options: {
				icon: <span>&clubs;</span>,
				text: generator.word(),
				nothing: null,
			},
			control: { type: 'radio' },
		},
		trailing: {
			options: {
				icon: <span>&spades;</span>,
				text: generator.word(),
				nothing: null,
			},
			control: { type: 'radio' },
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
Text.args = { ...Playground.args, emphasis: 'text', size: 'medium' };

export const Ghost = Playground.bind( {} );
Ghost.args = {
	...Playground.args,
	emphasis: 'ghost',
	size: 'medium',
};

export const Flat = Playground.bind( {} );
Flat.args = { ...Playground.args, emphasis: 'flat', size: 'medium' };

setupDefaultStory( Playground );
setupDerivedStory( [ Text, Ghost, Flat ] );
