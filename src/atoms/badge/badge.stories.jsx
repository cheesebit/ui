import React from 'react';

import { setupDefaultStory, setupDerivedStory } from 'common/stories-toolset';
import Badge from './badge';
import generator from 'test/data-generator';

export default {
	title: 'Components/Atoms/Badge',
	component: Badge,
	argTypes: {
		children: {
			table: {
				disable: true,
			},
		},
	},
};

/**
 * Badge playground story.
 *
 * @param {import('./badge').BadgeProps} args - Badge props.
 * @return {JSX.Element} Badge playground.
 */
export function Playground(args) {
	return (
		<div className="block">
			<p className="mb-2">This is me, a cool Badge ready to be played around. Try me :)</p>
			<Badge {...args} />
		</div>
	);
}

Playground.args = {
	children: generator.name(),
};

export const Default = Playground.bind({});
Default.args = { ...Playground.args, variant: 'neutral' };

export const Primary = Playground.bind({});
Primary.args = { ...Playground.args, variant: 'primary' };

export const Secondary = Playground.bind({});
Secondary.args = { ...Playground.args, variant: 'secondary' };

export const Terciary = Playground.bind({});
Terciary.args = { ...Playground.args, variant: 'terciary' };

setupDefaultStory(Playground);
setupDerivedStory([Default, Primary, Secondary, Terciary]);
