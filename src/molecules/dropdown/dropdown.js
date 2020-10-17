import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { ClickOutside } from '../../hocs/click-outside';
import { DEFAULT } from '../../common/constants';
import { isFunction, isNil, getID, omit, equals } from '../../common/toolset';
import DropdownItems from './dropdown-items';
import DropdownItem from './dropdown-item';
import DropdownToggle from './dropdown-toggle';
import DropdownContext from './dropdown-context';

import './dropdown.scss';

const OMITTED_PROPS = ['toggle', 'collapsed', 'items', 'unroll'];

class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);

    const { collapsed } = props;
    this.state = {
      collapsed,
    };

    this.handleToggle = this.handleToggle.bind(this);

    const { id } = props;
    this.id = getID(id);
    this.value = {
      collapsed,
      toggle: this.handleToggle,
    };
  }

  get classes() {
    const { className, unroll } = this.props;
    const { collapsed } = this.state;

    return clsx(
      'cb-dropdown',
      {
        '-unroll-right': equals(unroll, 'right'),
        '-unroll-left': equals(unroll, 'left'),
        '-unroll-block': equals(unroll, 'block'),
      },
      {
        'is-collapsed': collapsed,
      },
      className,
    );
  }

  get items() {
    const { items } = this.props;

    return items || DEFAULT.ARRAY;
  }

  handleToggle() {
    this.setState(({ collapsed }) => {
      const newCollapsed = !collapsed;

      this.value = {
        ...this.value,
        collapsed: newCollapsed,
      };

      return {
        collapsed: newCollapsed,
      };
    });
  }

  handleClickOutside = () => {
    const { collapsed } = this.state;

    if (collapsed) {
      return;
    }

    this.handleToggle();
  };

  renderToggle() {
    const { collapsed } = this.state;
    const { disabled, toggle } = this.props;

    if (isFunction(toggle)) {
      return toggle({ disabled, onClick: this.handleToggle, collapsed });
    }

    return (
      <DropdownToggle
        disabled={disabled}
        collapsed={collapsed}
        onClick={this.handleToggle}
      >
        {toggle}
      </DropdownToggle>
    );
  }

  renderItems() {
    const { children } = this.props;
    const items = this.items;

    if (!isNil(children)) {
      return children;
    }

    return <DropdownItems items={items} />;
  }

  renderDropdown = ({ ref }) => {
    const { classes, className, header, footer, style, ...others } = this.props;

    return (
      <DropdownContext.Provider value={this.value}>
        <div
          data-testid="cb-dropdown"
          {...omit(OMITTED_PROPS, others)}
          ref={ref}
          className={clsx(this.classes)}
          id={this.id}
          style={style}
        >
          {this.renderToggle()}
          {this.renderItems()}
        </div>
      </DropdownContext.Provider>
    );
  };

  render() {
    return (
      <ClickOutside disabled onClickOutside={this.handleClickOutside}>
        {this.renderDropdown}
      </ClickOutside>
    );
  }
}

Dropdown.propTypes = {
  collapsed: PropTypes.bool,
  unroll: PropTypes.oneOf(['right', 'left', 'block']),
};

Dropdown.defaultProps = {
  collapsed: true,
  unroll: 'right',
};

Dropdown.Items = DropdownItems;
Dropdown.Item = DropdownItem;
Dropdown.Toggle = DropdownToggle;

export default Dropdown;
