import React from 'react';
import clsx from 'clsx';

import { Box } from '../box';
import { Icon } from '../icon';

import './switch.scss';

const Switch = ({
  borderless = true,
  children,
  className,
  disabled,
  paddingless = 'horizontal',
  block = false,
  trailing,
  ...others
}) => {
  return (
    <Box
      as="label"
      borderless={borderless}
      paddingless={paddingless}
      block={block}
      trailing={trailing}
      className={clsx('cb-switch', { 'is-disabled': disabled }, className)}
      data-testid="cb-switch"
      leading={
        <React.Fragment>
          <input
            {...others}
            disabled={disabled}
            type="checkbox"
            className="selector"
            data-testid="selector"
          />
          <Icon name="circle" className="check" size={16} />
        </React.Fragment>
      }
    >
      {children}
    </Box>
  );
};

export default Switch;
