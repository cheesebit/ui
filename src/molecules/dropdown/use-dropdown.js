import React from 'react';
import { useValue } from '@cheesebit/use-value';

/**
 *
 * @param {useDropdownProps} props
 * @return {useDropdownReturn} functions to manage dropdown state.
 */
export function useDropdown( props ) {
	const { disabled = false } = props;
	const expanded = useValue( Boolean( props.expanded ) );

	React.useEffect(
		function update() {
			if ( disabled && expanded() ) {
				expanded( Boolean( props.expanded ) );
			}
		},
		[ disabled, props.expanded ]
	);

	const toggle = React.useCallback(
		function toggle() {
			if ( disabled ) {
				return;
			}

			expanded( ( isExpanded ) => ! isExpanded );
		},
		[ expanded ]
	);

	const expand = React.useCallback(
		function expand() {
			if ( disabled ) {
				return;
			}

			expanded( true );
		},
		[ disabled ]
	);

	const collapse = React.useCallback(
		function collapse() {
			if ( disabled ) {
				return;
			}

			expanded( false );
		},
		[ disabled ]
	);

	return { expanded: expanded(), disabled, toggle, expand, collapse };
}

export default useDropdown;

/**
 * @typedef {import('./dropdown.context').DropdownContextValue} DropdownContextValue
 */

/**
 * @typedef {Object} useDropdownProps
 * @property {DropdownContextValue['disabled']} [disabled] - is the dropdown disabled?
 * @property {DropdownContextValue['expanded']} [expanded] - is the dropdown expanded? currently we use the `@cheesebit/use-value` for this property.
 */

/**
 * @typedef {Object} useDropdownReturn
 * @property {boolean} expanded -
 * @property {boolean} disabled -
 * @property {(() => void)} toggle -
 * @property {(() => void)} expand -
 * @property {(() => void)} collapse -
 */
