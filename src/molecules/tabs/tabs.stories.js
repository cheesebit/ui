import React from 'react';

import { generateTabs } from './tabs.fixtures';
import Tabs from './tabs';

const tabs = generateTabs( { min: 4, max: 20 } );

export default {
	title: 'Components/Molecules/Tabs',
	component: Tabs,
};

export function Playground( args ) {
	return (
		<div className="block">
			<p className="mb-2">This is me, a cool Tabs.</p>

			<p className="mb-2">
				As I&apos;m <b>still a work in progress</b>, there&apos;s some maintenance going
				on, but soon enough you will be able to try me :)
			</p>

			<Tabs { ...args } />
		</div>
	);
}

Playground.args = {
	items: tabs,
};
