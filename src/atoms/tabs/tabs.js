import React from 'react';
import clsx from 'clsx';

import {
  OVERFLOW_OPTIONS,
  OVERFLOW_WAIT,
  OVERFLOW_WATCHER_SELECTOR,
  DEFAULT_DROPDOWN_WIDTH,
} from './constants';
import { DEFAULT } from '../../common/constants';
import { Dropdown } from '../../molecules/dropdown';
import { equals, isEmpty, isNil, omit } from '../../common/toolset';
import { getActiveTab, getActiveIndicator, setActiveTab } from './dom-helper';
import { OverflowWatcher } from '../../hocs/overflow-watcher';
import { setElementStyle } from '../../common/ui-toolset';
import { useID } from '../../hooks/id';
import ActiveTabIndicator from './active-indicator';
import selectors from './selectors';
import Tab from './tabs-tab';
import TabsContext from './tabs-context';

import './tabs.scss';

// TODO This component needs major organization improvements
function Tabs({
  active: propActive,
  className,
  items,
  style,
  children,
  onChange,
  ...others
}) {
  const id = useID(others);
  const tabsRef = React.useRef();
  const [active, setActive] = React.useState(
    selectors.getActive({ active: propActive, items, children }),
  );

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

  const handleTabChange = ({ id }) => {
    setActive(id);
    setActiveTab(id);
  };

  React.useEffect(() => {
    onChange && onChange?.({ active });
  }, [active]);

  React.useEffect(drawActiveTabIndicator, [active]);

  const renderToggle = ({ disabled, collapsed, onClick }) => (
    <Dropdown.Toggle
      disabled={disabled}
      collapsed={collapsed}
      onClick={onClick}
      icon="more-horizontal"
      trailing={null}
      borderless
    />
  );

  const renderTabs = ({ to }) => {
    return (items || DEFAULT.ARRAY).map((item, index) =>
      renderTab(item, index <= to),
    );
  };

  const renderTab = (tab, visible = true) => {
    const { id, props, ...others } = tab;

    return (
      <Tab
        key={`t-${id}`}
        {...props}
        {...omit(['for'], others)}
        id={id}
        active={active == id}
        className={clsx(props?.className, {
          'is-hidden': !visible,
        })}
        onClick={() => {
          handleTabChange({ id });
          props?.onClick?.();
        }}
      />
    );
  };

  const renderDropdown = ({ to }) => {
    const overflownItems = (items || DEFAULT.ARRAY).slice(to + 1);

    if (isNil(overflownItems) || isEmpty(overflownItems)) {
      return null;
    }

    return (
      <Dropdown
        className="overflown-tabs"
        toggle={renderToggle}
        items={overflownItems}
        unroll="left"
      >
        <Dropdown.Items hoverable>
          {items.map(renderDropdownItem)}
        </Dropdown.Items>
      </Dropdown>
    );
  };

  const renderDropdownItem = item => {
    const { id, props } = item;

    // since all tabs are rendered, we deduplicate keys prepending t- to their keys
    return (
      <Dropdown.Item
        key={`d-${id}`}
        {...props}
        id={id}
        className={clsx(props?.className, {
          'is-highlighted': equals(active, id),
        })}
      />
    );
  };

  const renderWatched = ({ from, to }) => {
    return (
      <div
        ref={tabsRef}
        className={clsx('cb-tabs', className)}
        data-testid="cb-tabs"
        {...others}
        id={id}
        role="tablist"
      >
        {<ActiveTabIndicator />}
        <TabsContext.Provider value={id}>
          {renderTabs({ from, to })}
        </TabsContext.Provider>
        {renderDropdown({ from, to })}
      </div>
    );
  };

  return (
    <OverflowWatcher
      containerRef={tabsRef}
      offset={DEFAULT_DROPDOWN_WIDTH}
      onUpdate={drawActiveTabIndicator}
      options={OVERFLOW_OPTIONS}
      selector={OVERFLOW_WATCHER_SELECTOR}
      wait={OVERFLOW_WAIT}
    >
      {renderWatched}
    </OverflowWatcher>
  );
}

// TODO Add prop types

export default Tabs;
