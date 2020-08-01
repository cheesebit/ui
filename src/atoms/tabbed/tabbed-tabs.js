import React from 'react';
import classNames from 'classnames';

import {
  OVERFLOW_OPTIONS,
  OVERFLOW_WAIT,
  OVERFLOW_WATCHER_SELECTOR,
  DEFAULT_DROPDOWN_WIDTH,
} from './constants';
import { compareProps } from '../../common/props-toolset';
import { DEFAULT } from '../../common/constants';
import { Dropdown } from '../../molecules/dropdown';
import { equals, isEmpty } from '../../common/toolset';
import { OverflowWatcher } from '../../hocs/overflow-watcher';
import { setElementStyle } from '../../common/ui-toolset';
import ActiveTabIndicator from './active-indicator';
import DOMHelper from './dom-helper';
import Tab from './tabbed-tab';

class Tabs extends React.PureComponent {
  componentDidMount() {
    this.moveTabIndicatorToActiveTab();
  }

  componentDidUpdate(prevProps) {
    const areEqual = compareProps('active');

    if (!areEqual(prevProps, this.props)) {
      this.moveTabIndicatorToActiveTab();
    }
  }

  get classes() {
    const { className } = this.props;

    return classNames(className, 'tabs');
  }

  get items() {
    const { items } = this.props;

    return items || DEFAULT.ARRAY;
  }

  moveTabIndicatorToActiveTab = () => {
    const { tabbed } = this.props;

    const activeTabElement = DOMHelper.getActiveTab({ tabbed });
    const activeIndicatorElement = DOMHelper.getActiveIndicator({ tabbed });

    let left = '100%';
    let width = '0px';

    if (activeTabElement && !activeTabElement.matches('.is-hidden')) {
      left = `${activeTabElement.offsetLeft}px`;
      width = `${activeTabElement.offsetWidth}px`;
    }

    setElementStyle(activeIndicatorElement, 'left', left);
    setElementStyle(activeIndicatorElement, 'width', width);
  };

  renderActiveIndicator = () => {
    return <ActiveTabIndicator />;
  };

  renderToggle = ({ disabled, collapsed, onClick }) => {
    return (
      <Dropdown.Toggle
        disabled={disabled}
        collapsed={collapsed}
        onClick={onClick}
        icon="more-horizontal"
        trailing={null}
        borderless
      />
    );
  };

  renderTabs = ({ to }) => {
    const items = this.items;

    return items.map((item, index) => this.renderTab(item, index <= to));
  };

  renderTab = (tab, visible = true) => {
    const { active } = this.props;
    const { for: id, props } = tab;

    return (
      <Tab
        key={id}
        {...props}
        id={id}
        active={equals(active, id)}
        className={classNames(props?.className, {
          'is-hidden': !visible,
        })}
      />
    );
  };

  renderDropdown = ({ to }) => {
    const items = this.items.slice(to + 1);

    if (isEmpty(items)) {
      return null;
    }

    return (
      <Dropdown
        className="overflown-tabs"
        toggle={this.renderToggle}
        items={items}
        unroll="left"
      >
        <Dropdown.Items hoverable>
          {items.map(this.renderDropdownItem)}
        </Dropdown.Items>
      </Dropdown>
    );
  };

  renderDropdownItem = item => {
    const { active } = this.props;
    const { for: id, props } = item;

    return (
      <Dropdown.Item
        key={id}
        {...props}
        className={classNames(props?.className, {
          'is-highlighted': equals(active, id),
        })}
      />
    );
  };

  renderWatched = ({ ref, from, to }) => {
    const { style } = this.props;

    return (
      <div
        ref={ref}
        className={this.classes}
        data-testid="cb-tabs"
        role="tablist"
        style={style}
      >
        {this.renderActiveIndicator()}
        {this.renderTabs({ from, to })}
        {this.renderDropdown({ from, to })}
      </div>
    );
  };

  render() {
    return (
      <OverflowWatcher
        offset={DEFAULT_DROPDOWN_WIDTH}
        onUpdate={this.moveTabIndicatorToActiveTab}
        options={OVERFLOW_OPTIONS}
        selector={OVERFLOW_WATCHER_SELECTOR}
        wait={OVERFLOW_WAIT}
      >
        {this.renderWatched}
      </OverflowWatcher>
    );
  }
}

export default Tabs;
