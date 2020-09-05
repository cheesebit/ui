import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { equals, pick } from '../../common/toolset';
import {
  resolveProp,
  evaluateBorderless,
  evaluatePaddingless,
} from '../../common/props-toolset';
import { withForwardedRef } from '../../hocs/with-forwarded-ref';
import { InputHTMLAttributes } from '../../common/props-dom';
import './input.scss';

const PICKED_PROPS = [];

export const Variant = {
  danger: 'danger',
  info: 'info',
  success: 'success',
  warn: 'warn',
};

/**
 * This component represents a button element.
 */
class Input extends React.PureComponent {
  get classes() {
    const { borderless, className, variant } = this.props;

    return clsx(
      'cb-input',
      {
        '-danger': equals(variant, Variant.danger),
        '-info': equals(variant, Variant.info),
        '-success': equals(variant, Variant.success),
        '-warn': equals(variant, Variant.warn),
      },
      evaluateBorderless(borderless),
      className,
    );
  }

  render() {
    const {
      forwardedRef,
      type,
      leading,
      trailing,
      stretched,
      ...others
    } = this.props;

    return (
      <input
        {...others}
        ref={forwardedRef}
        className={this.classes}
        type={type}
        data-testid="cb-input"
      />
    );
  }
}

Input.propTypes = {
  ...InputHTMLAttributes,
  borderless: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf([
      'top',
      'right',
      'bottom',
      'left',
      'horizontal',
      'vertical',
    ]),
    PropTypes.arrayOf(
      PropTypes.oneOf([
        'top',
        'right',
        'bottom',
        'left',
        'horizontal',
        'vertical',
      ]),
    ),
  ]),
  className: PropTypes.string,
  type: PropTypes.oneOf([
    'button',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ]),
};

Input.defaultProps = {
  borderless: false,
  className: null,
  type: 'text',
};

export default withForwardedRef(Input);
