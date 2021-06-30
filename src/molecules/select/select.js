import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { DEFAULT } from '../../common/constants';
import { Dropdown } from '../dropdown';
import {
  equals,
  isFunction,
  omit,
  getID,
  isEmpty,
  keys,
} from '../../common/toolset';
import { DataManager } from '../../common/data-manager/';
import { getUpdateID, toValue } from './select.helpers';
import { Icon } from '../../atoms/icon';
import { Mode } from '../../common/attribute-manager';
import Option from './select-option';
import Selectors from './selectors';

const [SELECTED, VISIBLE] = ['selected', 'visible'];
const OMITTED_PROPS = ['adapter', 'options', 'placeholder'];

class Select extends React.PureComponent {
  constructor(props) {
    super(props);

    const { value, multiple } = props;
    this.state = {
      selected: value,
      execution: null,
    };

    this.adapter = Selectors.getAdapter(props);
    this.manager = new DataManager({
      adapter: this.adapter,
      attributes: {
        selected: multiple ? Mode.propagate : Mode.unique,
        visible: Mode.path,
      },
      data: this.options,
    });
    this.optionByID = {};

    this.setup(props);
  }

  componentDidMount() {
    const ids = Selectors.getValue(this.props);

    if (isEmpty(ids)) {
      return;
    }

    this.manager.set(SELECTED, ids, true);

    this.setState({
      execution: getUpdateID(),
    });
  }

  componentDidUpdate(prevProps) {
    const { options, value } = this.props;
    let changed = false;

    if (!equals(prevProps.options, options)) {
      this.manager.data = options;
      this.manager.set(VISIBLE, keys(this.manager.data), true);

      changed = true;
    }

    if (!equals(prevProps.value, value)) {
      this.manager.reset(SELECTED);

      const ids = Selectors.getValue(this.props);
      this.manager.set(SELECTED, ids, true);
      this.manager.set(VISIBLE, id, true);

      changed = true;
    }

    if (changed) {
      this.setState({
        execution: getUpdateID(),
      });
    }
  }

  get classes() {
    const { className } = this.props;

    return clsx('cb-select', className);
  }

  get options() {
    const { options } = this.props;

    return options || DEFAULT.ARRAY;
  }

  get selected() {
    const getNode = id => this.manager.getNode(id)?.node;

    const ids = keys(this.manager.getAttribute(SELECTED));
    const nodes = ids.map(getNode);

    return nodes;
  }

  get value() {
    const { multiple } = this.props;
    const value = toValue(this.selected, multiple);

    return value;
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

    onChange?.({ target: { id, name, value: this.value } });
  };

  handleSelect = ({ value }) => {
    this.manager.set(SELECTED, value, true);

    this.setState(
      {
        execution: getUpdateID(),
      },
      this.publish,
    );
  };

  renderOptions = () => {
    const options = this.options;

    return options.map(this.renderOption);
  };

  renderOption = option => {
    const value = this.adapter.getID(option);
    const label = this.adapter.getLabel(option);

    return (
      <Option
        key={value}
        className={clsx({
          'is-highlighted': Boolean(
            this.manager.getAttributeByNodeID(SELECTED, value),
          ),
        })}
        {...option}
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
        selected,
        value: this.value,
      });
    }

    return (
      <Dropdown.Toggle
        disabled={disabled}
        collapsed={collapsed}
        onClick={onClick}
        trailing={
          <Icon
            className={clsx({ 'cb-u-rotate-180': !collapsed })}
            name="expand-more"
            size={16}
          />
        }
      >
        {this.value?.label || placeholder}
      </Dropdown.Toggle>
    );
  };

  render() {
    return (
      <Dropdown
        data-testid="cb-select"
        {...omit(OMITTED_PROPS, this.props)}
        className={this.classes}
        toggle={this.renderToggle}
      >
        <Dropdown.Items hoverable data-testid="options">
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
  id: getID(),
  value: null,
  placeholder: 'Select',
  unroll: 'block',
};

Select.Items = Dropdown.Items;
Select.Item = Dropdown.Item;
Select.Toggle = Dropdown.Toggle;

export default Select;
