import React from 'react';
import { classy } from '@cheesebit/classy';
import PropTypes from 'prop-types';
import { useValue } from '@cheesebit/use-value';

import {
	OVERFLOW_OPTIONS,
	OVERFLOW_WAIT,
	OVERFLOW_WATCHER_SELECTOR,
	DEFAULT_DROPDOWN_WIDTH,
} from './constants';
import { DEFAULT } from 'common/constants';
import { Dropdown } from 'molecules/dropdown';
import { getActiveTab, getActiveIndicator } from './tabs.helpers';
import { isEmpty, isNil } from 'common/toolset';
import { OverflowWatcher } from 'hocs/overflow-watcher';
import { setElementStyle } from 'common/ui-toolset';
import { useID } from 'hooks/id';
import ActiveTabIndicator from './active-indicator';
import selectors from './selectors';
import Tab from './tabs-tab';

import './tabs.scss';

function hashed(id) {
	id = String(id || '');

	if (id.startsWith('#')) {
		return id;
	}

	return `#${id}`;
}

/**
 *
 * @param {TabsProps} props
 * @return {JSX.Element} Tabs component.
 */
function Tabs(props) {
	const { className, items, ...others } = props;

	const active = useValue('');
	const id = useID(others);

	/** @type {React.MutableRefObject<HTMLDivElement>} */
	const tabsRef = React.useRef();

	function drawActiveTabIndicator() {
		const activeTabElement = getActiveTab(tabsRef.current);
		const activeIndicatorElement = getActiveIndicator(tabsRef.current);

		let left = '100%';
		let width = '0px';

		if (activeTabElement && !activeTabElement.matches('.is-hidden')) {
			left = `${activeTabElement.offsetLeft}px`;
			width = `${activeTabElement.offsetWidth / 2}px`;
		}

		setElementStyle(activeIndicatorElement, 'left', left);
		setElementStyle(activeIndicatorElement, 'width', width);
	}

	const handleHashChange = React.useCallback(function handleHashChange() {
		active(window.location.hash);
	}, []);

	function renderTrigger() {
		return <Dropdown.Trigger icon="more-horizontal" trailing={null} borderless />;
	}

	function renderTabs({ to }) {
		return (items || DEFAULT.ARRAY).map((item, index) => renderTab(item, index <= to));
	}

	function renderDropdown({ from }) {
		const overflownItems = (items || DEFAULT.ARRAY).slice(from);

		if (isNil(overflownItems) || isEmpty(overflownItems)) {
			return null;
		}

		return (
			<Dropdown className="overflown-tabs" unroll="left">
				{renderTrigger()}
				<Dropdown.Menu>{overflownItems.map(renderDropdownItem)}</Dropdown.Menu>
			</Dropdown>
		);
	}

	function renderTab(tab, visible = true) {
		const { id, ...others } = tab;
		const href = hashed(id);

		return (
			<Tab
				key={`t-${id}`}
				{...others}
				href={href}
				target="_self"
				active={active() === href}
				className={classy(others.className, {
					'is-hidden': !visible,
				})}
				onClick={() => {
					active(hashed(id));
				}}
			/>
		);
	}

	function renderDropdownItem(item) {
		const { id, label, ...others } = item;

		// since all tabs are rendered, we deduplicate keys prepending d- to their keys
		return (
			<Dropdown.Item
				key={`d-${id}`}
				{...others}
				className={classy(others?.className, {
					'is-highlighted': active() === hashed(id),
				})}
				onClick={() => {
					window.history.replaceState(null, null, hashed(id));
					active(hashed(id));
				}}
			>
				{label}
			</Dropdown.Item>
		);
	}

	function renderWatched({ from, to }) {
		return (
			<div
				ref={tabsRef}
				className={classy('cb-tabs', className)}
				data-testid="cb-tabs"
				{...others}
				id={id}
				role="tablist"
			>
				<ActiveTabIndicator />

				{renderTabs({ to })}
				{renderDropdown({ from: to + 1 })}
			</div>
		);
	}

	React.useEffect(
		function subscribeToHashChange() {
			const { ownerDocument } = tabsRef.current;
			ownerDocument.addEventListener('hashchange', handleHashChange, false);

			return function unsubscribeToHashChange() {
				ownerDocument.removeEventListener('hashchange', handleHashChange, false);
			};
		},
		[handleHashChange]
	);

	React.useEffect(() => {
		drawActiveTabIndicator();
	}, [active]);

	React.useEffect(() => {
		const initialActive = hashed(selectors.getActive(props));
		active(initialActive);

		window.history.replaceState(null, null, initialActive);
	}, []);

	return (
		<OverflowWatcher
			containerRef={tabsRef}
			options={OVERFLOW_OPTIONS}
			offset={DEFAULT_DROPDOWN_WIDTH}
			selector={OVERFLOW_WATCHER_SELECTOR}
			wait={OVERFLOW_WAIT}
			onUpdate={drawActiveTabIndicator}
		>
			{renderWatched}
		</OverflowWatcher>
	);
}

// storybook use only
Tabs.propTypes = {
	className: PropTypes.string,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			active: PropTypes.bool,
			disabled: PropTypes.bool,
			id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
			onClick: PropTypes.func,
		})
	).isRequired,
};

export default Tabs;

/**
 * @typedef {import('./tabs-tab').TabProps} TabProps
 */

/**
 * @typedef {Object} GenericTabProps
 * @property {TabsProps[]} [items] - d
 */

/**
 * @typedef {React.HTMLAttributes<HTMLDivElement> & GenericTabProps} TabsProps
 */
