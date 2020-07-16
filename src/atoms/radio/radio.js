import React from 'react';
import classNames from 'classnames';

import { Box } from '../box';
import { Icon } from '../icon';

import './radio.scss';

const PADDINGLESS = ['left', 'right'];

const Radio = ({ className, children, disabled, ...others }) => {
  return (
    <Box
      as="label"
      borderless
      paddingless={PADDINGLESS}
      className={classNames('cb-radio', { 'is-disabled': disabled }, className)}
      leading={
        <React.Fragment>
          <input
            {...others}
            type="radio"
            disabled={disabled}
            className="selector"
          />
          <Icon name="circle" className="circle" size={10} />
        </React.Fragment>
      }
      data-test="cb-radio"
    >
      {children}
    </Box>
  );
};

export default Radio;
