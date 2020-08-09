import React from 'react';
import clsx from 'clsx';

import { Box } from '../box';
import { Icon } from '../icon';

import './radio.scss';

const Radio = ({
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
      className={clsx('cb-radio', { 'is-disabled': disabled }, className)}
      data-testid="cb-radio"
      leading={
        <React.Fragment>
          <input
            {...others}
            type="radio"
            disabled={disabled}
            className="selector"
            data-testid="selector"
          />
          <Icon name="circle" className="circle" size={16} />
        </React.Fragment>
      }
    >
      {children}
    </Box>
  );
};

Radio.defaultProps = {
  borderless: true,
  paddingless: 'horizontal',
  stretched: false,
};

export default Radio;
