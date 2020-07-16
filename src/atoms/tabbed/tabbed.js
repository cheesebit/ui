import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { DEFAULT } from '../../common/constants';
import { getID, omit } from '../../common/toolset';
import DOMHelper from './dom-helper';
import Selectors from './selectors';

import Panel from './tabbed-panel';
import Tabs from './tabbed-tabs';

import './tabbed.scss';

const OMITTED_PROPS = ['tabs', 'children'];

/**
 * This component represents our customized Tabbed content.
 */
class Tabbed extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: Selectors.getActive(props),
    };

    const { id } = props;

    this.id = getID(id);
    this.tabs = [];

    this.setup();
  }

  componentDidMount() {
    const { active } = this.state;

    DOMHelper.check({ id: active });
  }

  setup() {
    const { tabs } = this.props;

    this.tabs = (tabs || DEFAULT.ARRAY).map(item => {
      const { for: id, label, props } = item;

      return {
        for: id,
        props: {
          children: label,
          ...props,
          onClick: () => {
            this.handleTabChange({ id });
            DOMHelper.check({ id });
            props?.onClick?.();
          },
        },
      };
    });
  }

  get classes() {
    const { className, disabled } = this.props;

    return classNames(
      'cb-tabbed',
      {
        'is-disabled': disabled,
      },
      className,
    );
  }

  get style() {
    const { style } = this.props;

    return style || DEFAULT.OBJECT;
  }

  publish = () => {
    const { active } = this.state;
    const { onChange } = this.props;

    onChange && onChange({ active });
  };

  handleTabChange = ({ id }) => {
    this.setState(
      {
        active: id,
      },
      this.publish,
    );
  };

  renderChildren = () => {
    const { children } = this.props;

    return React.Children.map(children, child => {
      return React.cloneElement(child, {
        tabbed: this.id,
        onFocus: this.handleTabChange,
      });
    });
  };

  render() {
    const { children, disabled, ...others } = this.props;
    const { active } = this.state;

    return (
      <section
        data-test="c-tabbed"
        {...omit(OMITTED_PROPS, others)}
        id={this.id}
        className={this.classes}
        style={this.style}
      >
        <Tabs
          active={active}
          disabled={disabled}
          items={this.tabs}
          onChange={this.handleTabChange}
          tabbed={this.id}
        />
        {this.renderChildren()}
      </section>
    );
  }
}

Tabbed.propTypes = {
  active: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      for: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      props: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      label: PropTypes.node,
      icon: PropTypes.string,
    }),
  ).isRequired,
};

Tabbed.Panel = Panel;

export default Tabbed;
