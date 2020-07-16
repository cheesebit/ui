import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from '../dropdown';

class SelectOption extends React.PureComponent {
  handleClick = () => {
    const { onClick, value } = this.props;

    onClick && onClick({ value });
  };

  render() {
    const { children, value, ...others } = this.props;

    return (
      <Dropdown.Item
        id={value}
        {...others}
        onClick={this.handleClick}
        data-test="option"
      >
        {children}
      </Dropdown.Item>
    );
  }
}

SelectOption.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default SelectOption;
