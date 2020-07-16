import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { DEFAULT } from '../../common/constants';
import { isBlank, values } from '../../common/toolset';
import { MODE, POSITION } from './constants';

import './tooltip.scss';

/**
 * Component to show quick and short CSS-only tips.
 */
class Tooltip extends React.PureComponent {
  render() {
    const { children, className, text, mode, position } = this.props;
    const { props } = children;
    const { title, className: childClassName } = props || DEFAULT.OBJECT;

    if (isBlank(text) && isBlank(title)) {
      return children;
    }

    return React.cloneElement(children, {
      title: null,
      'aria-label': text || title,
      'data-title': text || title,
      className: classNames(
        'cb-tooltip',
        {
          'is-tooltip-light': mode === MODE.LIGHT,
          'is-tooltip-dark': mode === MODE.DARK,
          'is-tooltip-top': position === POSITION.TOP,
          'is-tooltip-right': position === POSITION.RIGHT,
          'is-tooltip-bottom': position === POSITION.BOTTOM,
          'is-tooltip-left': position === POSITION.LEFT,
        },
        childClassName,
        className,
      ),
    });
  }
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string,
  position: PropTypes.oneOf(values(POSITION)),
  mode: PropTypes.oneOf(values(MODE)),
};

Tooltip.defaultProps = {
  position: POSITION.TOP,
  mode: MODE.DARK,
};

Tooltip.POSITION = POSITION;
Tooltip.MODE = MODE;

export default Tooltip;
