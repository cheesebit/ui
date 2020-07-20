import React from 'react';
import classNames from 'classnames';

import { Box } from '../box';
import { Icon } from '../icon';

import './checkbox.scss';

const Checkbox = ({
  borderless,
  children,
  className,
  disabled,
  paddingless,
  stretched,
  trailing,
  ...others
}) => {
  return (
    <Box
      as="label"
      borderless={borderless}
      paddingless={paddingless}
      stretched={stretched}
      trailing={trailing}
      className={classNames(
        'cb-checkbox',
        { 'is-disabled': disabled },
        className,
      )}
      data-test="cb-checkbox"
      leading={
        <React.Fragment>
          <input
            {...others}
            disabled={disabled}
            type="checkbox"
            className="selector"
          />
          <Icon name="check" className="check" size={14} />
        </React.Fragment>
      }
    >
      {children}
    </Box>
  );
};

Checkbox.defaultProps = {
  borderless: true,
  paddingless: 'horizontal',
  stretched: false,
};

export default Checkbox;
