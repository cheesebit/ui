import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { equals } from '../../common/toolset';

import './badge.scss';

export const Variant = {
  primary: 'primary',
  secondary: 'secondary',
  terciary: 'terciary',
};

const Badge = ({ className, children, variant, ...others }) => {
  const classes = classNames(
    'cb-badge',
    {
      '-primary': equals(variant, Variant.primary),
      '-secondary': equals(variant, Variant.secondary),
      '-terciary': equals(variant, Variant.terciary),
    },
    className,
  );

  return (
    <span className={classes} data-test="cb-badge" {...others}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  variant: PropTypes.oneOf([
    Variant.primary,
    Variant.secondary,
    Variant.terciary,
  ]),
};

Badge.defaultProps = {
  variant: null,
};

export default Badge;