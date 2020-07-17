import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Box } from '../../atoms/box';
import { List } from '../../atoms/list';
import { DEFAULT } from '../../common/constants';

import { Checkbox } from '../../atoms/checkbox';

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

  get style() {
    const widths = [];

    for (let column of this.columns) {
      widths.push(column?.props?.style?.width ?? '1fr');
    }

    return {
      gridTemplateColumns: widths.join(' '),
    };
  }

  render() {
    const { id } = this.props;

    /**
     * TODO: Remove literal objects/arrays
     * TODO: Isolate children (think of a better way to pass props into box's children)
     * TODO: Break this component into super small parts
     */
    return (
      <section id={id} className={this.classes} data-test="cb-table">
        <Box
          stretched
          data-test="header"
          className="header row"
          paddingless={['vertical']}
          borderless={['horizontal', 'top']}
          leading={<Checkbox />}
          children={{
            style: this.style,
            children: this.columns.map(column => (
              <Box
                key={column.name}
                as="span"
                borderless
                paddingless={['horizontal']}
                className="cell"
                data-test={column.name}
              >
                {column.name}
              </Box>
            )),
          }}
        />
        <List data-test="body" className="body" bordered hoverable striped>
          {this.data.map(entry => (
            <List.Item
              key={entry.id}
              stretched
              className="row"
              paddingless={['vertical']}
              data-test="row"
              leading={<Checkbox />}
              children={{
                style: this.style,
                children: this.columns.map(column => (
                  <Box
                    key={column.name}
                    as="span"
                    borderless
                    className="cell"
                    data-test={column.name}
                    paddingless={['horizontal']}
                    style={column?.props?.style}
                  >
                    {entry[column.name]}
                  </Box>
                )),
              }}
            />
          ))}
        </List>
      </section>
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
