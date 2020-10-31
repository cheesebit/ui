import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { Box } from '../../atoms/box';
import { Checkbox } from '../../atoms/checkbox';
import { DEFAULT } from '../../common/constants';
import { Dropdown } from '../../molecules/dropdown';
import { List } from '../../atoms/list';

import './table.scss';

class Table extends React.PureComponent {
  get classes() {
    const { className } = this.props;

    return clsx('cb-table', {}, className);
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
      display: 'grid',
      gridTemplateColumns: widths.join(' '),
    };
  }

  render() {
    const { id } = this.props;

    /**
     * TODO: Remove literal objects/arrays
     * TODO: Remove fake row actions (dropdown)
     * TODO: Isolate children (think of a better way to pass props into box's children)
     * TODO: Break this component into super small parts
     */
    return (
      <section id={id} className={this.classes} data-testid="cb-table">
        <Box
          block
          data-testid="header"
          className="header row"
          paddingless="vertical"
          borderless={['horizontal', 'top']}
          leading={<Checkbox />}
          trailing={
            <Dropdown
              unroll="left"
              toggle={({ disabled, collapsed, onClick }) => (
                <Dropdown.Toggle
                  disabled={disabled}
                  collapsed={collapsed}
                  onClick={onClick}
                  icon="more-horizontal"
                  trailing={null}
                  borderless
                />
              )}
              items={[
                {
                  id: 1,
                  children: 'Editar Colunas',
                  icon: 'create',
                  onClick: () => {
                    alert('Hi ' + entry[this.columns[0].name]);
                  },
                },
              ]}
            />
          }
        >
          <div style={this.style}>
            {this.columns.map(column => (
              <Box
                key={column.name}
                as="span"
                borderless
                paddingless="horizontal"
                className="cell"
                data-testid={column.name}
                style={column?.props?.style}
              >
                {column.name}
              </Box>
            ))}
          </div>
        </Box>
        <List data-testid="body" className="body" bordered hoverable striped>
          {this.data.map(entry => (
            <List.Item
              key={entry.id}
              block
              className="row"
              data-testid="row"
              leading={<Checkbox />}
              padding="vertical"
              trailing={
                <Dropdown
                  unroll="left"
                  toggle={({ disabled, collapsed, onClick }) => (
                    <Dropdown.Toggle
                      disabled={disabled}
                      collapsed={collapsed}
                      onClick={onClick}
                      icon="more-horizontal"
                      trailing={null}
                      borderless
                    />
                  )}
                  items={[
                    {
                      id: 1,
                      children: 'Editar',
                      icon: 'create',
                      onClick: () => {
                        alert('Hi ' + entry[this.columns[0].name]);
                      },
                    },
                  ]}
                />
              }
            >
              <div style={this.style}>
                {this.columns.map(column => (
                  <Box
                    key={column.name}
                    as="span"
                    borderless
                    className="cell"
                    paddingless
                    data-testid={column.name}
                    style={column?.props?.style}
                  >
                    {entry[column.name]}
                  </Box>
                ))}
              </div>
            </List.Item>
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

// children={{
//   style: this.style,
//   children: this.columns.map(column => (
//     <Box
//       key={column.name}
//       as="span"
//       borderless
//       className="cell"
//       paddingless="horizontal"
//       data-testid={column.name}
//       style={column?.props?.style}
//     >
//       {entry[column.name]}
//     </Box>
//   )),
// }}
