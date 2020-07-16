import React from 'react';
import classNames from 'classnames';

import { Box } from '../box';
import { Icon } from '../icon';

import './checkbox.scss';

const PADDINGLESS = ['left', 'right'];

const Checkbox = ({ className, children, disabled, ...others }) => {
  return (
    <Box
      as="label"
      borderless
      paddingless={PADDINGLESS}
      className={classNames(
        'cb-checkbox',
        { 'is-disabled': disabled },
        className,
      )}
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
      data-test="cb-checkbox"
    >
      {children}
    </Box>
  );
};

export default Checkbox;
