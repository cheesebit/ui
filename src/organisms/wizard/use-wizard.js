import React from 'react';
import { useAutomaton } from '@cheesebit/use-automaton';

import { getID } from '../../common/toolset';

const useWizard = ( { current: initialCurrent, id, flow } ) => {
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
};

export default useWizard;
