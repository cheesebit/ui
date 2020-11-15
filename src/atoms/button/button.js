import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { Box } from '../box';
import { equals, omit } from '../../common/toolset';
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
class Button extends React.PureComponent {
  get classes() {
    const { className, emphasis, size } = this.props;

    return clsx(
      'cb-button',
      {
        '-flat': equals(emphasis, Emphasis.flat),
        '-ghost': equals(emphasis, Emphasis.ghost),
        '-text': equals(emphasis, Emphasis.text),
        '-small': equals(size, Size.small),
        '-medium': equals(size, Size.medium),
        '-large': equals(size, Size.large),
      },
      className,
    );
  }

  renderLeading() {
    const { icon, leading } = this.props;

    if (icon) {
      const { icon } = this.props;

      return <Icon {...resolveProp(icon, 'name')} />;
    }

    return leading;
  }

  render() {
    const { type, ...others } = this.props;

    return (
      <Box
        as="button"
        data-testid="cb-button"
        paddingless="vertical"
        {...omit(OMITTED_PROPS, others)}
        type={type}
        className={this.classes}
        leading={this.renderLeading()}
      />
    );
  }
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

Button.defaultProps = {
  emphasis: Emphasis.ghost,
  size: Size.small,
  type: 'button',
  disabled: false,
};

export default Button;
