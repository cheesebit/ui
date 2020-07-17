import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Box } from '../../atoms/box';
import { List } from '../../atoms/list';
import { DEFAULT } from '../../common/constants';

import { Checkbox } from '../../atoms/checkbox';
import { Dropdown } from '../../molecules/dropdown';
import generator from '../../../test/data-generator';

import './table.scss';

class Table extends React.PureComponent {
  get classes() {
    return classNames('cb-table', {});
  }

  get columns() {
    const { columns } = this.props;

    return columns ?? DEFAULT.ARRAY;
  }

  get data() {
    const { data } = this.props;

    return data ?? DEFAULT.ARRAY;
  }

  render() {
    const { id } = this.props;

    return (
      <List
        id={id}
        className={this.classes}
        bordered
        hoverable
        data-test="cb-table"
      >
        <Box
          stretched
          className="header row"
          paddingless={['vertical']}
          borderless={['horizontal', 'top']}
          leading={<Checkbox />}
        >
          {this.columns.map(column => (
            <Box
              key={column.name}
              as="span"
              borderless
              paddingless
              className="header cell"
              data-test={column.name}
            >
              {column.name}
            </Box>
          ))}
        </Box>

        {this.data.map(entry => (
          <List.Item
            key={entry.id}
            stretched
            className="body row"
            paddingless={['vertical']}
            data-test="row"
            leading={<Checkbox />}
            trailing={
              <Dropdown
                toggle={({ disabled, collapsed, onClick }) => (
                  <Dropdown.Toggle
                    disabled={disabled}
                    collapsed={collapsed}
                    onClick={onClick}
                    icon="more-horizontal"
                    borderless
                    trailing={null}
                  />
                )}
                items={[
                  {
                    id: generator.id(),
                    icon: 'create',
                    children: 'Edit',
                    onClick: () => {
                      alert(`You wanted to edit`);
                    },
                  },
                  {
                    id: generator.id(),
                    icon: 'close',
                    children: 'Delete',
                    onClick: () => {
                      alert(`You wanted to delete`);
                    },
                  },
                ]}
                unroll="left"
              />
            }
          >
            {this.columns.map(column => (
              <Box
                key={column.name}
                as="span"
                borderless
                className="cell"
                data-test={column.name}
                paddingless={['horizontal']}
              >
                {entry[column.name]}
              </Box>
            ))}
          </List.Item>
        ))}
      </List>
    );
  }
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
    }),
  ),
};

export default Table;
