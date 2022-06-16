/**
 * Strategy to manage single selection.
 *
 * @param {SelectionStrategyContext} context - Strategy context.
 * @return {SelectionStrategy} Strategy instance to manage single selection
 */
export function SingleSelectionStrategy( context ) {
	return {
		type() {
			return 'single';
		},
		init( items ) {
			return this.select( items, new Map() );
		},
		select( items ) {
			/** @type {SelectionState} */
			const newSelection = new Map();

			for ( let i = 0; i < items.slice( 0, 1 ).length; i++ ) {
				const adapter = context.getAdapter( items[ i ]._type );
				newSelection.set( adapter.getID( items[ i ] ), items[ i ] );
			}

			return newSelection;
		},
		unselect( keys, selection ) {
			/** @type {SelectionState} */
			const newSelection = new Map( selection );

			for ( let i = 0; i < keys.length; i++ ) {
				newSelection.delete( keys[ i ] );
			}

			return newSelection;
		},
		toggle( items, selection ) {
			/** @type {SelectionState} */
			const newSelection = new Map();

			for ( let i = 0; i < items.slice( 0, 1 ).length; i++ ) {
				const adapter = context.getAdapter( items[ i ]._type );

				if ( ! selection.has( adapter.getID( items[ i ] ) ) ) {
					newSelection.set( adapter.getID( items[ i ] ), items[ i ] );
				}
			}

			return newSelection;
		},
		clear() {
			return new Map();
		},
	};
}

/**
 * Strategy to manage multiple selection.
 *
 * @param {SelectionStrategyContext} context - Strategy context.
 * @return {SelectionStrategy} Strategy instance to manage multiple selection
 */
export function MultipleSelectionStrategy( context ) {
	return {
		type() {
			return 'multiple';
		},
		init( items ) {
			return this.select( items, new Map() );
		},
		select( items, selection ) {
			/** @type {SelectionState} */
			const newSelection = new Map( selection );

			for ( let i = 0; i < items.length; i++ ) {
				const adapter = context.getAdapter( items[ i ]._type );
				newSelection.set( adapter.getID( items[ i ] ), items[ i ] );
			}

			return newSelection;
		},
		unselect( keys, selection ) {
			/** @type {SelectionState} */
			const newSelection = new Map( selection );

			for ( let i = 0; i < keys.length; i++ ) {
				newSelection.delete( keys[ i ] );
			}

			return newSelection;
		},
		toggle( items, selection ) {
			/** @type {SelectionState} */
			const newSelection = new Map( selection );

			console.log( { items, selection } );
			for ( let i = 0; i < items.length; i++ ) {
				const adapter = context.getAdapter( items[ i ]._type );
				const key = adapter.getID( items[ i ] );

				if ( ! selection.has( key ) ) {
					newSelection.set( key, items[ i ] );
				} else {
					newSelection.delete( key );
				}
			}

			console.log( newSelection );
			return newSelection;
		},
		clear() {
			return new Map();
		},
	};
}

/**
 * Determines the selection strategy based on the provided props.
 *
 * @param {Object} props
 * @param {SelectionType} [props.type] - Selection type (multiple or single selection)
 * @param {Record<string, SelectionAdapter>} [props.adapters]
 * @return {SelectionStrategy} Proper strategy instance to manage selection.
 */
export function createSelectionStrategy( props ) {
	const { adapters, type } = props;

	/** @type {SelectionStrategyContext} */
	const context = {
		getAdapter( type ) {
			return adapters[ type ];
		},
	};

	switch ( type ) {
		case 'multiple':
			return MultipleSelectionStrategy( context );
		case 'single':
		default:
			return SingleSelectionStrategy( context );
	}
}

/**
 * @typedef {Object} Selectable
 * @property {string} [_type] - Item type
 */

/**
 * @typedef {Map<string, any>} SelectionState
 */

/**
 * @typedef {('single' | 'multiple')} SelectionType
 */

/**
 * @typedef {Object} SelectionAdapter
 * @property {((o: any) => string)} getID Function to get the item's identifier
 */

/**
 * @typedef {Object} SelectionStrategy
 * @property {() => string} type - Return strategy type.
 * @property {(items: any[]) => SelectionState} init - Initialize selection.
 * @property {(items: any[], selection: SelectionState) => SelectionState} select - Add items to selection.
 * @property {(keys: string[], selection: SelectionState) => SelectionState} unselect - Remove items from selection.
 * @property {(items: any[], selection: SelectionState) => SelectionState} toggle - Add to selection items that are no selected and remove items that are selected.
 * @property {(selection: SelectionState) => SelectionState} clear - Clear selection
 */

/**
 * @typedef {Object} SelectionStrategyContext
 * @property {(type?: string) => SelectionAdapter} getAdapter - Get adapter function for the given type.
 */
