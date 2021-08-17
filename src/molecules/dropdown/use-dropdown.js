import React from 'react';
import { useValue } from '@cheesebit/use-value';

export function useTrigger( props ) {
	const expanded = useValue( Boolean( props.expanded ) );

	React.useEffect( function update( ) {
		expanded( Boolean( props.expanded ) );
	}, [ props.expanded ] );

	const toggle = React.useCallback( function toggle() {
		expanded( ( isExpanded ) => ! isExpanded );
	}, [ expanded ] );

	return { expanded, toggle };
}

export function useDropdown() {

}
