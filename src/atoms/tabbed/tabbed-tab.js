import React from 'react';
import clsx from 'clsx';

import { isFunction } from '../../common/toolset';
import { Box } from '../box';

class Tab extends React.PureComponent {
  get classes() {
    const { active, className, disabled } = this.props;

    return clsx(
      'tab',
      {
        'is-active': active,
        'is-focused': active,
        'is-disabled': disabled,
      },
      className,
    );
  }

  handleClick = () => {
    const { id, onClick } = this.props;

    onClick && onClick({ id });
  };

  renderLabel = () => {
    const { active, children, id } = this.props;

    if (isFunction(children)) {
      return children({ id, active });
    }

    return children;
  };

  render() {
    const { id: htmlFor, active, disabled, ...others } = this.props;

    return (
      <Box
        borderless
        {...others}
        data-testid="tab"
        as="label"
        className={this.classes}
        role="tab"
        aria-selected={active}
        aria-disabled={disabled}
        htmlFor={htmlFor}
        onClick={this.handleClick}
      >
        {this.renderLabel()}
      </Box>
    );
  }
}

Tab.defaultProps = {
  active: false,
  disabled: false,
};

export default Tab;
