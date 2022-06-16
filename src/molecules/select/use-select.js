import React from 'react';

import { createSelectionBoundary } from './use-selection';
import {
	getDatasources,
	extractAdapters,
	getValue,
	getDisplayValue,
} from './use-select.helpers';
import { toArray } from 'common/toolset';
import { useDropdown } from '../dropdown';
import { useFocusTrap } from 'hooks/focus-trap';
import GenericAdapter from './generic-adapter';
import useOptions from './use-options';

export const { SelectionContext, useSelection } = createSelectionBoundary();

/**
 *
 * @param {React.FocusEvent<HTMLInputElement>} e
 */
function TriggerOnFocusHandler( e ) {
	e.target.select();
}

/**
 * useSelect
 *
 * @param {SelectProps} props
 * @return {useSelectReturn} select data and components configurations.
 */
function useSelect( props ) {
	const { multiple, onChange, name, disabled = false } = props;
	const dropdown = useDropdown( props );

	const datasources = React.useMemo(
		() => getDatasources( props ),
		[ props.datasources, props.options ]
	);
	const adapters = React.useMemo(
		() => extractAdapters( datasources ),
		[ datasources ]
	);

	const selection = useSelection( {
		selected: toArray( props.value || [] ),
		type: multiple ? 'multiple' : 'single',
		adapters,
		onChange: React.useCallback(
			function handleSelectionChange( selected ) {
				onChange?.( {
					target: { name, value: getValue( selected, multiple ) },
				} );
			},
			[ multiple, name, onChange ]
		),
	} );

	/** @type {React.MutableRefObject<HTMLInputElement>} */
	const triggerRef = React.useRef();
	const focusTrap = useFocusTrap( {
		keys: [ 'ARROW_UP', 'ARROW_DOWN' ],
		onDeactivate() {
			triggerRef.current?.focus();
		},
	} );

	const [ query, setQuery ] = React.useState(
		getDisplayValue( adapters, selection.selected, multiple )
	);

	const options = useOptions( { datasources } );

	/** @type {useSelectReturn['getOption']} */
	const getOption = React.useCallback(
		/**
		 *
		 * @param {Option} option
		 * @return {{ label: any; value: any; checked: boolean; }} option label, value and checked state.
		 */
		function getOption( option ) {
			const adapter = adapters[ option._type || '' ] || GenericAdapter;

			const value = adapter.getID( option );
			const label = adapter.getLabel( option );
			const checked = selection.selected.has( value );

			return { label, value, checked };
		},
		[ adapters, selection.selected ]
	);

	const toggleOption = React.useCallback(
		/**
		 *
		 * @param {Option} option
		 * @return {void}
		 */
		function toggleOption( option ) {
			selection.toggle( option );
		},
		[ selection ]
	);

	/** @type {useSelectReturn['getDropdownProps']} */
	const getDropdownProps = React.useCallback(
		function getDropdownProps() {
			return {
				disabled,
				toggle: dropdown.toggle,
				expanded: dropdown.expanded,
				onBlur() {
					setQuery(
						getDisplayValue(
							adapters,
							selection.selected,
							multiple
						)
					);
					options.fetch( '' );
				},
			};
		},
		[
			adapters,
			dropdown.expanded,
			dropdown.toggle,
			multiple,
			options,
			selection.selected,
		]
	);

	/** @type {useSelectReturn['getTriggerProps']} */
	const getTriggerProps = React.useCallback(
		function getTriggerProps() {
			return {
				disabled,
				ref( node ) {
					if ( node != null ) {
						triggerRef.current = node;
					}
				},
				value: query,
				onClick() {
					if ( ! dropdown.expanded ) {
						dropdown.expand();
					}
				},
				onChange( e ) {
					const newQuery = e.target.value;
					setQuery( newQuery );
					dropdown.expand();
					options.fetch( newQuery );
				},
				onFocus: TriggerOnFocusHandler,
			};
		},
		[ query, dropdown, options ]
	);

	/** @type {useSelectReturn['getClearProps']} */
	const getClearProps = React.useCallback(
		function getClearProps() {
			return {
				async onClick() {
					setQuery( '' );
					selection.clear();
					options.clear();

					triggerRef.current?.focus();

					await options.fetch( '' );
				},
			};
		},
		[ options, selection ]
	);

	/** @type {useSelectReturn['getMenuProps']} */
	const getMenuProps = React.useCallback(
		function getMenuProps() {
			return {
				ref: focusTrap.containerRef,
				role: 'listbox',
			};
		},
		[ focusTrap.containerRef ]
	);

	/** @type {useSelectReturn['getOptionProps']} */
	const getOptionProps = React.useCallback(
		function getOptionProps( option ) {
			const { label, value, checked } = getOption( option );

			return {
				role: 'option',
				'aria-selected': checked,
				id: value,
				onClick() {
					setQuery( checked ? '' : label );
					toggleOption( option );

					/**
					 * This return tells DropdownMenuItem if it should or should not
					 * togle the dropdown.
					 */
					return multiple;
				},
				tabIndex: -1,
			};
		},
		[ getOption, toggleOption ]
	);

	React.useEffect(
		function onInit() {
			void options.fetch( '' );
		},
		[ datasources ]
	);

	React.useEffect(
		function onDropdownToggle() {
			if ( dropdown.expanded ) {
				focusTrap.activate();
			} else {
				focusTrap.deactivate();
			}
		},
		/**
		 * We are interested in activating/deactivating our
		 * focus trap when the dropdown changes its expanded state.
		 */
		[ dropdown.expanded ]
	);

	React.useEffect(
		function updateOnSelectedChange() {
			setQuery(
				getDisplayValue( adapters, selection.selected, multiple )
			);
		},
		[ adapters, multiple, selection.selected ]
	);

	return {
		status: options.status,
		options: options.get(),
		query: query ?? '',
		value: getValue( selection.selected, multiple ),

		dropdown,
		selection,

		getMenuProps,
		getOption,
		getOptionProps,
		getTriggerProps,
		getClearProps,
		getDropdownProps,
	};
}

export default useSelect;

/**
 * @typedef {import('./selection-strategy').Selectable} Selectable
 * @typedef {import('./selection-strategy').Selectable} Option
 * @typedef {import('./selection-strategy').SelectionState} SelectionState
 * @typedef {import('./selection-strategy').SelectionAdapter} SelectionAdapter
 * @typedef {import('./selection-strategy').SelectionStrategy} SelectionStrategy
 */

/**
 * @typedef {import('./select.types').GenericOption} GenericOption
 * @typedef {import('./select.types').QueryStatus} QueryStatus
 * @typedef {import('./select.types').SelectDatasourceAdapter} SelectDatasourceAdapter
 * @typedef {import('./select.types').SelectDatasource} SelectDatasource
 * @typedef {import('./select.types').SelectDatasourceFunction} SelectDatasourceFunction
 * @typedef {import('./select.types').SelectProps} SelectProps
 */

/**
 * @typedef {Object} useSelectReturn
 * @property {QueryStatus} status -
 * @property {Option[]} options -
 * @property {string} query -
 * @property {Option | Option[] | null} value -
 * @property {import('./use-selection').useSelectionReturn} selection -
 * @property {import('../dropdown/use-dropdown').useDropdownReturn} dropdown -
 * @property {(() => { ref: React.Ref<HTMLElement>; role: string })} getMenuProps -
 * @property {((option: Option) => { label: string; value: string; checked: boolean })} getOption -
 * @property {((option: Option) => { role: string; 'aria-selected': boolean; id: string; onClick: () => void; tabIndex: number })} getOptionProps -
 * @property {(() => { ref: (node: HTMLInputElement | null) => void; value: string; disabled: boolean; onClick: () => void; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onFocus: (e: React.FocusEvent<HTMLInputElement>) => void })} getTriggerProps -
 * @property {(() => { onClick: () => void })} getClearProps -
 * @property {(() => { toggle: () => void; disabled: boolean; expanded: boolean; onBlur: () => void })} getDropdownProps -
 */
