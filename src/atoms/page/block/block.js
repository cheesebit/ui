import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {
  evaluateBorderless,
  evaluatePaddingless,
} from '../../../common/props-toolset';

import './block.scss';

const Block = ({
  borderless,
  children,
  className,
  main,
  paddingless,
  ...props
}) => {
  return (
    <section
      {...props}
      className={classNames(
        'cb-block',
        {
          '-main': main,
        },
        evaluateBorderless(borderless),
        evaluatePaddingless(paddingless),
        className,
      )}
      role="section"
      data-testid="cb-block"
    >
      {children}
    </section>
  );
};

Block.propTypes = {
  main: PropTypes.bool,
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
  paddingless: PropTypes.oneOfType([
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
};

Block.defaultProps = {
  main: false,
};

export default Block;
