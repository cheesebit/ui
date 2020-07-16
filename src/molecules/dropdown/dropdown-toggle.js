import React from 'react';
import classNames from 'classnames';

import { Button, Size } from '../../atoms/button';
import { Icon } from '../../atoms/icon';
import { isNil } from '../../common/toolset';

class DropdownToggle extends React.PureComponent {
  get classes() {
    const { className } = this.props;

    return classNames('toggle', className);
  }

  renderArrow = () => {
    const { collapsed, trailing } = this.props;

    if (!isNil(trailing)) {
      return trailing;
    }

    return (
      <span>
        <Icon
          className={classNames({ 'cb-u-rotate-180': !collapsed })}
          name="expand-more"
          size={16}
        />
      </span>
    );
  };

  render() {
    const { collapsed, children, onClick, ...others } = this.props;

    return (
      <Button
        data-test="toggle"
        stretched
        trailing={this.renderArrow()}
        {...others}
        aria-haspopup="true"
        aria-expanded={!collapsed}
        className={this.classes}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  }
}

export default DropdownToggle;
