import React from 'react';
import { useAutomaton } from '@cheesebit/use-automaton';

import { getID } from 'common/toolset';

/**
 *
 * @template T
 * @param {WizardProps<T>} props
 * @returns
 */
function useWizard( props ) {
	const { current: initialCurrent, id, flow } = props;
	const { current, transition } = useAutomaton( flow, initialCurrent );
	const contextValueRef = React.useRef( {
		id: getID( id ),
		transition,
	} );

	return {
		transition,
		states: flow[ current ]?.on,
		current,
		contextValue: contextValueRef.current,
	};
}

export default useWizard;

/**
 * @template T
 * @typedef {import('./wizard').WizardProps<T>} WizardProps
 */
