import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { equals } from '../../common/toolset';

import './button.scss';

class Button extends React.PureComponent {
  render() {
    const { type, className, children, emphasis, size, ...others } = this.props;

    return (
      <button
        type={type}
        className={classNames(
          'cb-button',
          {
            '-low-emphasis': equals(emphasis, EMPHASIS.LOW),
            '-medium-emphasis': equals(emphasis, EMPHASIS.MEDIUM),
            '-high-emphasis': equals(emphasis, EMPHASIS.HIGH),
            '-small': equals(size, SIZE.SMALL),
            '-medium': equals(size, SIZE.MEDIUM),
            '-large': equals(size, SIZE.LARGE)
          },
          className
        )}
        {...others}
        data-test="cb-button"
      >
        {children}
      </button>
    );
  }
}

export const TYPE = {
  BUTTON: 'button',
  RESET: 'reset',
  SUBMIT: 'submit'
};

export const EMPHASIS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

export const SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
};

Button.propTypes = {
  type: PropTypes.oneOf([TYPE.BUTTON, TYPE.RESET, TYPE.SUBMIT]),
  emphasis: PropTypes.oneOf([EMPHASIS.LOW, EMPHASIS.MEDIUM, EMPHASIS.HIGH]),
  size: PropTypes.oneOf([SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE])
};

Button.defaultProps = {
  type: TYPE.BUTTON,
  emphasis: EMPHASIS.MEDIUM,
  size: SIZE.SMALL
};

export default Button;
