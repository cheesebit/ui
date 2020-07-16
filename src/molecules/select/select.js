import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { DEFAULT } from '../../common/constants';
import { Dropdown } from '../dropdown';
import { equals, isFunction } from '../../common/toolset';
import Option from './select-option';

class Select extends React.PureComponent {
  constructor(props) {
    super(props);

    const { value } = props;
    this.state = {
      selected: value,
    };

    this.optionByID = {};
    this.setup(props);
  }

  get classes() {
    const { className } = this.props;

    return classNames('cb-select', className);
  }

  get options() {
    const { options } = this.props;

    return options || DEFAULT.ARRAY;
  }

  setup(props) {
    const options = props?.options || DEFAULT.ARRAY;

    for (let i = 0; i < options.length; i++) {
      const option = options[i];

      this.optionByID[option.value] = option;
    }
  }

  publish = () => {
    const { id, onChange, name } = this.props;
    const { selected } = this.state;

    onChange?.({ target: { id, name, value: this.optionByID[selected] } });
  };

  handleSelect = ({ value }) => {
    this.setState(
      {
        selected: value,
      },
      this.publish,
    );
  };

  renderOptions = () => {
    const options = this.options;

    return options.map(this.renderOption);
  };

  renderOption = option => {
    const { selected } = this.state;
    const { label, value, ...others } = option;

    return (
      <Option
        key={value}
        className={classNames({
          'is-highlighted': equals(selected, value),
        })}
        {...others}
        onClick={this.handleSelect}
        value={value}
      >
        {label}
      </Option>
    );
  };

  renderToggle = ({ disabled, collapsed, onClick }) => {
    const { selected } = this.state;
    const { placeholder, toggle } = this.props;

    if (isFunction(toggle)) {
      return toggle({
        collapsed,
        disabled,
        onClick,
        value: this.optionByID[selected],
      });
    }

    return (
      <Dropdown.Toggle
        disabled={disabled}
        collapsed={collapsed}
        onClick={onClick}
        borderless={['top', 'horizontal']}
      >
        {this.optionByID[selected]?.label || placeholder}
      </Dropdown.Toggle>
    );
  };

  render() {
    return (
      <Dropdown
        className={this.classes}
        toggle={this.renderToggle}
        unroll="stretched"
        data-test="cb-select"
      >
        <Dropdown.Items hoverable data-test="options">
          {this.renderOptions()}
        </Dropdown.Items>
      </Dropdown>
    );
  }
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
  ).isRequired,
  placeholder: PropTypes.string,
};

Select.defaultProps = {
  value: null,
  placeholder: 'Select',
};

Select.Items = Dropdown.Items;
Select.Item = Dropdown.Item;
Select.Toggle = Dropdown.Toggle;

export default Select;
