import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { DEFAULT } from '../../common/constants';
import { omit, isNil } from '../../common/toolset';
import {
  resolveProp,
  evaluateBorderless,
  evaluatePaddingless,
} from '../../common/props-toolset';

import './box.scss';

const OMITTED_PROPS = [
  'as',
  'borderless',
  'children',
  'leading',
  'paddingless',
  'stretched',
  'trailing',
];

class Box extends React.PureComponent {
  get classes() {
    const { borderless, paddingless, stretched, className } = this.props;

    return classNames(
      'cb-box',
      { '-stretched': stretched },
      evaluateBorderless(borderless),
      evaluatePaddingless(paddingless),
      className,
    );
  }

  get style() {
    const { size, style = DEFAULT.OBJECT } = this.props;

    return { ...style, width: size, height: size };
  }

  renderLeading() {
    const { leading } = this.props;

    return (
      !isNil(leading) && (
        <span className="leading" {...resolveProp(leading, 'children')} />
      )
    );
  }

  renderChildren() {
    const { children } = this.props;

    return (
      !isNil(children) && (
        <span className="children" {...resolveProp(children, 'children')} />
      )
    );
  }

  renderTrailing() {
    const { trailing } = this.props;

    return (
      !isNil(trailing) && (
        <span className="trailing" {...resolveProp(trailing, 'children')} />
      )
    );
  }

  render() {
    const { as: Tag = 'div', ...others } = this.props;

    return (
      <Tag
        data-test="cb-box"
        {...omit(OMITTED_PROPS, others)}
        className={this.classes}
        style={this.style}
      >
        {this.renderLeading()}
        {this.renderChildren()}
        {this.renderTrailing()}
      </Tag>
    );
  }
}

Box.propTypes = {
  leading: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]),
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
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]),
  trailing: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
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
  stretched: PropTypes.bool,
};

Box.defaultProps = {
  stretched: false,
  borderless: false,
};

export default Box;
