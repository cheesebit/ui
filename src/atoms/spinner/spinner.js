import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { equals } from '../../common/toolset';

import './spinner.scss';

export const Variant = {
  primary: 'primary',
  secondary: 'secondary',
  terciary: 'terciary',
};

/**
 * This component represents our loading spinner.
 */
const Spinner = ({ children, className, variant, size, ...others }) => {
  const classes = clsx(
    'cb-spinner',
    {
      '-primary': equals(variant, Variant.primary),
      '-secondary': equals(variant, Variant.secondary),
      '-terciary': equals(variant, Variant.terciary),
    },
    className,
  );

  return (
    <div className={classes} {...others} data-testid="cb-spinner">
      <span className="circle" style={{ fontSize: size }} />
      {children}
    </div>
  );
};

Spinner.propTypes = {
  variant: PropTypes.oneOf([
    Variant.primary,
    Variant.secondary,
    Variant.terciary,
  ]),
  size: PropTypes.number,
};

Spinner.defaultProps = {
  variant: null,
};

export default React.memo(Spinner);
