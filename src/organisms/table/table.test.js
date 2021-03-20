import React from 'react';

import { Table } from './index';
import { screen, render, getByTestId } from '../../../test/helpers';
import generator from '../../../test/data-generator';

const COLUMNS = [
  {
    name: 'company',
  },
  {
    name: 'profession',
  },
  {
    name: 'salary',
  },
  {
    name: 'syllable',
  },
];

const generateTableData = () =>
  generator.array(() => {
    return {
      company: generator.company(),
      id: generator.id(),
      profession: generator.profession(),
      salary: generator.float({ min: 100, max: 19999, fixed: 2 }),
      syllable: generator.syllable(),
    };
  }, generator.natural({ min: 2, max: 5 }));

describe('Table', () => {
  it('renders correctly', () => {
    const props = { columns: COLUMNS, data: generateTableData() };

    render(<Table {...props} />);
    const component = screen.getByTestId('cb-table');
    const rows = screen.getAllByTestId('row');

    expect(component).toBeTruthy();
    expect(rows).toHaveLength(props.data.length);

    for (let i = 0; i < props.data.length; i++) {
      const entry = props.data[i];

      for (let column of props.columns) {
        expect(getByTestId(rows[i], column.name)).toHaveTextContent(
          String(entry[column.name]),
        );
      }
    }
  });
});
