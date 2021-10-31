import React from 'react';
import clsx from 'clsx';

import { useAutomaton } from '@cheesebit/use-automaton';

const DEFAULT_STATES = {
	out: {
		on: {
			enter: 'in',
		},
	},
	in: {
		on: {
			exit: 'out',
		},
	},
};

const DEFAULT_CLASSES = {
	out: 'animate-out',
	in: 'animate-in',
};

function useAnimation(states, classes, currentProp = 'out') {
	const timeoutIDRef = React.useRef(null);
	const { transition, current } = useAutomaton(
		states || DEFAULT_STATES,
		currentProp
	);
	const safeClasses = classes || DEFAULT_CLASSES;

	// TODO: Create a more generic way to manage animation

	const handleMouseEnter = React.useCallback(() => {
		clearTimeout(timeoutIDRef.current);

		transition('enter');
	}, []);

	const handleMouseLeave = React.useCallback(() => {
		clearTimeout(timeoutIDRef.current);

		timeoutIDRef.current = setTimeout(() => {
			transition('exit');
		}, 1500);
	}, []);

	return {
		transition,
		current,
		onEnter: handleMouseEnter,
		onExit: handleMouseLeave,
		className: clsx({
			[safeClasses.entering]: current == 'entering',
			[safeClasses.in]: current == 'in',
			[safeClasses.exiting]: current == 'exiting',
			[safeClasses.out]: current == 'out',
		}),
	};
}

export default useAnimation;
