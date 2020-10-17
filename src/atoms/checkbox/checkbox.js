import React from 'react';
import clsx from 'clsx';

import { Box } from '../box';
import { Icon } from '../icon';

import './checkbox.scss';

const Checkbox = ({
  borderless,
  children,
  className,
  disabled,
  paddingless,
  block,
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
      className={clsx('cb-checkbox', { 'is-disabled': disabled }, className)}
      data-testid="cb-checkbox"
      leading={
        <React.Fragment>
          <input
            {...others}
            disabled={disabled}
            type="checkbox"
            className="selector"
            data-testid="selector"
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
  block: false,
};

export default Checkbox;
