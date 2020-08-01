import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { equals } from '../../common/toolset';
import { withForwardedRef } from '../../hocs/with-forwarded-ref';

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
    const { className, variant } = this.props;

    return classNames(
      'cb-input',
      {
        '-danger': equals(variant, Variant.danger),
        '-info': equals(variant, Variant.info),
        '-success': equals(variant, Variant.success),
        '-warn': equals(variant, Variant.warn),
      },
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
  className: null,
  type: 'text',
};

export default withForwardedRef(Input);
