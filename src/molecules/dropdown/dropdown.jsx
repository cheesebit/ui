import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useClassy from '@cheesebit/classy';

import { DropdownMenu, DropdownMenuItem } from './dropdown-menu';
import { omit } from 'common/toolset';
import { useClickOutside } from 'hooks/click-outside';
import { useID } from 'hooks/id';
import DropdownContext from './dropdown.context';
import DropdownTrigger from './dropdown-trigger';
import useDropdown from './use-dropdown';

import './dropdown.scss';

const OMITTED_PROPS = ['trigger', 'expanded', 'expand', 'collapse', 'items', 'unroll', 'hoverable'];

// TODO: throw error if props.toggle is undefined for GenericDropdown

/**
 *
 * @param {GenericDropdownProps} props
 * @return {JSX.Element} Generic dropdown component that can have its `disabled`, `expanded`, and `toggle` customized.
 */
export function GenericDropdown(props) {
	const ref = useRef();
	const id = useID(props);
	const { prop, classy } = useClassy(props);

	const { children, className, disabled, expanded, onBlur, toggle, ...others } = props;

	/** @type {DropdownContextValue} */
	const contextValue = { disabled, expanded, toggle };

	useClickOutside(ref, function handleClickOutside() {
		if (!expanded) {
			return;
		}

		toggle();
		onBlur?.();
	});

	return (
		<DropdownContext.Provider value={contextValue}>
			<div
				data-testid="cb-dropdown"
				{...omit(OMITTED_PROPS, others)}
				ref={ref}
				className={classy(
					'cb-dropdown',
					{
						'-unroll-right': prop({ unroll: 'right' }),
						'-unroll-left': prop({ unroll: 'left' }),
						'-unroll-block': prop({ unroll: 'block' }),
					},
					{
						'is-expanded': expanded,
					},
					className
				)}
				id={id}
			>
				{children}
			</div>
		</DropdownContext.Provider>
	);
}

/**
 *
 * @param {DropdownProps} props
 * @return {JSX.Element} Dropdown component.
 */
function Dropdown(props) {
	const { unroll = 'right' } = props;
	const dropdownProps = useDropdown(props);

	return <GenericDropdown {...props} {...dropdownProps} unroll={unroll} />;
}

Dropdown.propTypes = {
	unroll: PropTypes.oneOf(['right', 'left', 'block']),
};

Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownMenuItem;
Dropdown.Trigger = DropdownTrigger;

export default Dropdown;

/**
 * @typedef {import('./dropdown.context').DropdownContextValue} DropdownContextValue
 */

/**
 * @typedef {('right' | 'left' | 'block')} DropdownUnrolMode
 */

/**
 * @typedef {Object} GenericDropdownProps
 * @property {string} [id] - dropdown ID
 * @property {string} [className] - additional class name to apply to the dropdown.
 * @property {Function} [onBlur] - event handler for when the dropdown loses focus.
 * @property {DropdownContextValue['disabled']} [disabled] - is the dropdown disabled?
 * @property {DropdownContextValue['expanded']} [expanded] - is the dropdown expanded? currently we use the `@cheesebit/use-value` for this property.
 * @property {DropdownContextValue['toggle']} [toggle] - toggle the dropdown collapsed state.
 * @property {React.ReactNode} [children] - dropdown content.
 * @property {DropdownUnrolMode} [unroll] - how to unroll the dropdown.
 *
 */

/**
 * @typedef {GenericDropdownProps & { unroll?: DropdownUnrolMode }} DropdownProps
 */
