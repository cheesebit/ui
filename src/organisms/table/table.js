import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Box } from '../../atoms/box';
import { List } from '../../atoms/list';
import { DEFAULT } from '../../common/constants';

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
        {this.data.map(entry => (
          <List.Item
            key={entry.id}
            stretched
            className="row"
            paddingless
            data-test="row"
          >
            {this.columns.map(column => (
              <Box
                key={column.name}
                as="span"
                borderless
                className="cell"
                data-test={column.name}
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
