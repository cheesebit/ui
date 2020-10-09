import React from 'react';
import clsx from 'clsx';

import { Button, Size } from '../../atoms/button';
import { Icon } from '../../atoms/icon';
import { isNil } from '../../common/toolset';

class DropdownToggle extends React.PureComponent {
  get classes() {
    const { className, collapsed } = this.props;

    return clsx(
      'toggle',
      {
        '-flat': !collapsed,
      },
      className,
    );
  }

  renderArrow = () => {
    const { collapsed, trailing } = this.props;

    if (!isNil(trailing)) {
      return trailing;
    }

    return (
      <Icon
        className={clsx({ 'cb-u-rotate-180': !collapsed })}
        name="expand-more"
        size={16}
      />
    );
  };

  render() {
    const { collapsed, children, onClick, ...others } = this.props;

    return (
      <Button
        data-testid="toggle"
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
