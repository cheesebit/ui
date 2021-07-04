import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useClassy } from '@cheesebit/classy';

import { Box } from '../box';
import { omit } from '../../common/toolset';
import { Icon } from '../icon';
import { resolveProp } from '../../common/props-toolset';

import './button.scss';

const OMITTED_PROPS = ['leading', 'emphasis', 'icon'];

export const Emphasis = {
  flat: 'flat',
  ghost: 'ghost',
  text: 'text',
};

export const Size = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

/**
 * This component represents a button element.
 */

Button.defaultProps = {
  emphasis: Emphasis.ghost,
  size: Size.small,
  type: 'button',
  disabled: false,
  borderless: false,
  paddingless: 'vertical',
};

function Button(props) {
  const { prop, classy } = useClassy(props);
  const {
    emphasis = Emphasis.ghost,
    paddingless = 'vertical',
    size = Size.small,
    type = 'button',
    className,
    icon,
    leading,
    ...others
  } = props;

  function renderLeading() {
    if (icon) {
      return <Icon {...resolveProp(icon, 'name')} />;
    }

    return leading;
  }

  return (
    <Box
      as="button"
      data-testid="cb-button"
      paddingless={paddingless}
      {...omit(OMITTED_PROPS, others)}
      type={type}
      leading={renderLeading()}
      className={classy(
        'cb-button',
        {
          '-flat': prop({ emphasis: Emphasis.flat }),
          '-ghost': prop({ emphasis: Emphasis.ghost }),
          '-text': prop({ emphasis: Emphasis.text }),
        },
        {
          '-small': prop({ size: Size.small }),
          '-medium': prop({ size: Size.medium }),
          '-large': prop({ size: Size.large }),
        },
        className,
      )}
    />
  );
}

Button.propTypes = {
  /**
   * Determine borders to be supressed.
   */
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
  /**
   * Should this button be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * What emphasis you want to apply to this button.
   */
  emphasis: PropTypes.oneOf([Emphasis.text, Emphasis.ghost, Emphasis.flat]),
  /**
   * Set icon to be shown in the leading area of this button.
   */
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  ]),
  /**
   * Determine paddings to be supressed.
   */
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
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf([Size.small, Size.medium, Size.large]),
  /**
   * Button type, as per HTML definition.
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
