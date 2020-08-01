import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { isNil, keys } from '../../common/toolset';
import { DEFAULT } from '../../common/constants';
import mapping from './icon-mapping';

import './icon.scss';

/**
 * This is our component to render Icons.
 */
class Icon extends React.PureComponent {
  get classes() {
    const { className } = this.props;

    return classNames('cb-icon', className);
  }

  get style() {
    const { size, style = DEFAULT.OBJECT } = this.props;

    return { ...style, width: size, height: size };
  }

  render() {
    const { name } = this.props;

    const IconSVG = mapping[name];

    if (isNil(IconSVG)) {
      return '?';
    }

    return (
      <IconSVG
        className={this.classes}
        aria-label={name}
        style={this.style}
        data-testid="cb-icon"
      />
    );
  }
}

Icon.propTypes = {
  size: PropTypes.number,
  name: PropTypes.string,
};

Icon.defaultProps = { size: 16 };

export default Icon;
