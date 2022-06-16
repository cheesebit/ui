import React from 'react';

import { createSelectionStrategy } from './selection-strategy';
import { identity, isEmpty, toArray } from 'common/toolset';
import { noop } from 'common/constants';
import { useFingerprint } from 'hooks/fingerprint';
import { useMounted } from 'hooks/mounted';

/** @type {Record<string, SelectionAdapter>} */
const DEFAULT_ADAPTERS = {};

/**
 * Create a generic collection selection manager.
 *
 * @return {((props: useSelectionProps) => useSelectionReturn)} custom `useSelection` hook.
 */
function createUseSelection() {
	/**
	 * Hook to manage selection.
	 *
	 * @param {useSelectionProps} props
	 * @return {useSelectionReturn} selection functions.
	 */
	function useSelection( props ) {
		const { adapters, type, onChange } = props;

		const isMounted = useMounted();
		/** @type {SelectionStrategy} */
		const strategy = React.useMemo(
			() =>
				createSelectionStrategy( {
					adapters: adapters || DEFAULT_ADAPTERS,
					type: type ?? 'single',
				} ),
			[ adapters, type ]
		);

		/**
		 *
		 * @param {SelectionState} state
		 * @param {SelectionAction} action
		 * @return {SelectionState} new selection state.
		 */
		function reducer( state, action ) {
			switch ( action.type ) {
				case 'select':
					return strategy.select( action.payload, state );
				case 'unselect':
					return strategy.unselect( action.payload, state );
				case 'toggle':
					return strategy.toggle( action.payload, state );
				case 'clear':
					return strategy.clear( state );
			}
		}

		function initializer() {
			return strategy.init( toArray( props.selected ) );
		}

		/** @type {[SelectionState, React.Dispatch<SelectionAction>]} */
		const [ selected, dispatch ] = React.useReducer(
			reducer,
			new Map(),
			initializer
		);
		const { resetFingerprint, hasSameFingerprint } = useFingerprint( {
			adapter: identity,
			items: Array.from( selected.keys() ),
		} );
		/** @type {React.MutableRefObject<SelectionAction['type'][]>} */
		const pendingOnChangeCallForRef = React.useRef( [] );

		/**
		 * Select items.
		 *
		 * @param {Selectable | Selectable[]} items - Items to select.
		 */
		function select( items ) {
			pendingOnChangeCallForRef.current.push( 'select' );

			dispatch( {
				type: 'select',
				payload: toArray( items ),
			} );
		}

		/**
		 * Unselect items.
		 *
		 * @param {string | string[]} keys - Keys from items to be unselect.
		 */
		function unselect( keys ) {
			pendingOnChangeCallForRef.current.push( 'unselect' );

			dispatch( {
				type: 'unselect',
				payload: toArray( keys ),
			} );
		}

		/**
		 * Toggle items.
		 *
		 * @param {Selectable | Selectable[]} items - Items to be toggled.
		 */
		function toggle( items ) {
			pendingOnChangeCallForRef.current.push( 'toggle' );

			dispatch( {
				type: 'toggle',
				payload: toArray( items ),
			} );
		}

		function clear() {
			pendingOnChangeCallForRef.current.push( 'clear' );

			dispatch( {
				type: 'clear',
			} );
		}

		React.useEffect(
			function handleChange() {
				/**
				 * `pendingOnChangeCallForRef` will ensure that will trigger the `onChange` callback
				 * only if any relevant change(s) happened (i.e. all actions except 'reset').
				 */
				if (
					isMounted &&
					! isEmpty( pendingOnChangeCallForRef.current )
				) {
					pendingOnChangeCallForRef.current.shift();

					onChange?.( selected );
				}
			},
			[ isMounted, selected, onChange ]
		);

		React.useEffect(
			function updateOnSelectedPropChange() {
				const newSelected = initializer();
				const keys = Array.from( newSelected.keys() );

				if ( hasSameFingerprint( keys ) ) {
					return;
				}

				resetFingerprint( keys );
				dispatch( {
					type: 'reset',
					payload: newSelected,
				} );
			},
			/**
			 * initializer is not relevant for our changes, that's why its ommitted.
			 */
			[ props.selected, hasSameFingerprint, resetFingerprint ]
		);

		return { selected, select, unselect, toggle, clear };
	}

	return useSelection;
}

/** @type {useSelectionReturn}*/
const INITIAL_SELECTABLE_CONTEXT_VALUE = {
	clear: noop,
	select: noop,
	unselect: noop,
	toggle: noop,
	selected: new Map(),
};

/**
 * Create tools to manage selection of items.
 *
 * @return {createSelectionReturn} Custom context and hook to manage selection.
 */
export function createSelectionBoundary() {
	/** @type {React.Context<useSelectionReturn>}*/
	const SelectionContext = React.createContext(
		INITIAL_SELECTABLE_CONTEXT_VALUE
	);

	const useSelection = createUseSelection();

	return { SelectionContext, useSelection };
}

/**
 * @typedef {import('./selection-strategy').Selectable} Selectable
 * @typedef {import('./selection-strategy').SelectionState} SelectionState
 * @typedef {import('./selection-strategy').SelectionAdapter} SelectionAdapter
 * @typedef {import('./selection-strategy').SelectionStrategy} SelectionStrategy
 */

/**
 * @typedef {{ type: 'select'; payload: any[] } | { type: 'unselect'; payload: string[] } | { type: 'toggle'; payload: any[] } | { type: 'clear' } | { type: 'reset'; payload: SelectionState }} SelectionAction
 */

/**
 * @typedef {'single' | 'multiple'} SelectionType
 */

/**
 * @typedef {Object} useSelectionProps
 * @property {any | any[]} selected - initial selected.
 * @property {SelectionType} [type] - Selection type (multiple or single selection).
 * @property {(selected: SelectionState) => void} [onChange] - function called when selection changes.
 * @property {Record<string, SelectionAdapter>} adapters - Adapters for the managed items.
 */

/**
 * @typedef {Object} useSelectionReturn
 * @property {SelectionState} selected - Current selected.
 * @property {(items: any | any[]) => void} select - Function to add items to the selection.
 * @property {(keys: string | string[]) => void} unselect - Function to remove items to the selection.
 * @property {(items: any | any[]) => void} toggle - Add to selection items that are no selected and remove items that are selected.
 * @property {() => void} clear - Clear selection.
 */

/**
 * @typedef {Object} createSelectionReturn
 * @property {React.Context<useSelectionReturn>} SelectionContext - Context to be applied for handling selection.
 * @property {((props: useSelectionProps) => useSelectionReturn)} useSelection - Hook for managing selection.
 */
