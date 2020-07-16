import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { resolveProp } from '../../common/props-toolset';
import { equals, omit } from '../../common/toolset';
import { evaluateBorderless } from '../../common/props-toolset';
import { Box } from '../box';
import { Icon } from '../icon';
import './button.scss';

const OMITTED_PROPS = ['leading', 'emphasis', 'icon'];
const PADDINGLESS = ['top', 'bottom'];

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
    const { borderless, className, emphasis, size } = this.props;

    return classNames(
      'cb-button',
      {
        '-flat': equals(emphasis, Emphasis.flat),
        '-ghost': equals(emphasis, Emphasis.ghost),
        '-text': equals(emphasis, Emphasis.text),
        '-small': equals(size, Size.small),
        '-medium': equals(size, Size.medium),
        '-large': equals(size, Size.large),
      },
      evaluateBorderless(borderless),
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
    const { type, children, ...others } = this.props;

    return (
      <Box
        as="button"
        data-test="cb-button"
        paddingless={PADDINGLESS}
        {...omit(OMITTED_PROPS, others)}
        type={type}
        className={this.classes}
        leading={this.renderLeading()}
      >
        {children}
      </Box>
    );
  }
}

Button.propTypes = {
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
  emphasis: PropTypes.oneOf([Emphasis.text, Emphasis.ghost, Emphasis.flat]),
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
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
  size: PropTypes.oneOf([Size.small, Size.medium, Size.large]),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

Button.defaultProps = {
  className: null,
  size: Size.small,
  type: 'button',
  disabled: false,
};

export default Button;