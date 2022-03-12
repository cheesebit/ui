import React from 'react';
import { classy } from '@cheesebit/classy';

import useFocusTrap from './use-focus-trap';

export default {
	title: 'Hooks/useFocusTrap',
};

function Experiment(props) {
	const { containerRef, active, activate, deactivate } = useFocusTrap(props);

	return (
		<div className="space-y-4 text-center">
			<p data-testid="trap-status">Trap is {active ? 'active' : 'inactive'}</p>
			<div
				ref={containerRef}
				className={classy(
					'inline-flex flex-row justify-center space-x-2 p-4 border-2 rounded',
					{
						'border-neutral-darker': active,
						'border-neutral-lighter border-dashed': !active,
					}
				)}
			>
				<button className="p-4 rounded bg-neutral-light" type="button">
					1
				</button>
				<button className="p-4 rounded bg-neutral-light" type="button">
					2
				</button>
				<button className="p-4 rounded bg-neutral-light" type="button">
					3
				</button>
			</div>
			<div className="flex flex-row justify-center space-x-2">
				<button
					className="p-2 bg-transparent border rounded border-neutral-darker"
					type="button"
					onClick={active ? deactivate : activate}
				>
					{active ? 'Deactivate' : 'Activate'}
				</button>
			</div>
		</div>
	);
}

export function Playground(args) {
	return (
		<div className="flex flex-col space-y-2">
			<p>Activate the trap and tab through the numbered buttons</p>
			<Experiment {...args} />
		</div>
	);
}

Playground.args = {
	keys: ['TAB'],
};

export function TabTrap(args) {
	return (
		<div className="flex flex-col space-y-2">
			<p>Activate the trap and tab through the numbered buttons</p>
			<small>
				Notice that tabbing through does <strong>not</strong> allow focus to exit the trap.
			</small>
			<Experiment {...args} elements={6} keys={['TAB']} />
		</div>
	);
}

TabTrap.args = {};

export function ArrowTrap(args) {
	return (
		<div className="flex flex-col space-y-2">
			<p>
				Activate the trap and navigate through the numbered buttons using the up and down
				arrow keys.
			</p>
			<small>Notice that tabbing through allows focus to exit the trap.</small>
			<Experiment {...args} keys={['ARROW_UP', 'ARROW_DOWN']} />
		</div>
	);
}

ArrowTrap.args = {};
