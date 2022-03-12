// @ts-nocheck
// TODO: figure out why List.Item gives an error

import React from 'react';
import useClassy from '@cheesebit/classy';

import { DEFAULT } from 'common/constants';
import { List, FloatingList } from 'atoms/list';
import { isNil } from 'common/toolset';
import { useFocusTrap } from 'hooks/focus-trap';
import DropdownContext from './dropdown.context';

/**
 *
 * @param {DropdownMenuItemProps} props
 * @return {JSX.Element} Dropdown menu item component.
 */
export function DropdownMenuItem(props) {
	const { onClick, children, disabled, ...others } = props;
	/** @type {DropdownContextValue} */
	const dropdown = React.useContext(DropdownContext);

	return (
		<List.Item
			data-testid="item"
			role="menuitem"
			{...others}
			{...(!dropdown.expanded && { tabIndex: '-1' })}
			block
			borderless
			// {/* we disable when not expanded so it becomes unfocusable */}
			disabled={Boolean(!dropdown.expanded || dropdown.disabled || disabled)}
			onClick={(e) => {
				const shouldToggle = !onClick?.(e);

				if (shouldToggle) {
					dropdown.toggle();
				}
			}}
			as="button"
			type="button"
		>
			<span className="children">{children}</span>
		</List.Item>
	);
}

export const DropdownMenu = React.forwardRef(
	/**
	 * @param {DropdownMenuProps} props
	 * @param {React.Ref<HTMLElement>} ref
	 * @return {JSX.Element} Dropdown Menu  component.
	 */
	function DropdownMenu(props, ref) {
		/** @type {DropdownContextValue} */
		const dropdown = React.useContext(DropdownContext);

		const { classy } = useClassy(props);
		const focusTrap = useFocusTrap({
			keys: ['ARROW_UP', 'ARROW_DOWN'],
			onDeactivate() {
				// triggerRef.current?.focus();
			},
		});

		const { className, children, hoverable = true, items, ...others } = props;

		React.useEffect(
			function onDropdownToggle() {
				if (dropdown.expanded) {
					focusTrap.activate();
				} else {
					focusTrap.deactivate();
				}
			},
			/**
			 * We are interested in activating/deactivating our
			 * focus trap when the dropdown changes its expanded state.
			 */
			[dropdown.expanded]
		);

		function renderItems() {
			if (!isNil(children)) {
				return children;
			}

			return (items || DEFAULT.ARRAY).map((item, index) => (
				// TODO: use adapter here, instead of assuming the item has an ID
				<DropdownMenuItem key={item.id ?? index} {...item} />
			));
		}

		return (
			<FloatingList
				data-testid="items"
				className={classy('menu', className)}
				hoverable={hoverable}
				role="menu"
				ref={ref || focusTrap.containerRef}
				{...others}
			>
				{renderItems()}
			</FloatingList>
		);
	}
);

/**
 * @typedef {import('./dropdown.context').DropdownContextValue} DropdownContextValue
 */

/**
 * @typedef {import('atoms/list/list-item').ListItemProps & { id?: string, onClick: Function }} DropdownMenuItemProps
 */

/**
 * @typedef {import('atoms/list/list').ListProps & { items?: DropdownMenuItemProps[] }} DropdownMenuProps
 */
