import React from 'react';
import { shallow } from 'enzyme';

import { Table } from './index';
import { findByTestAttr, asTestAttr } from '../../../test/helpers';
import generator from '../../../test/data-generator';
import { prop } from '../../common/toolset';
import { data } from 'autoprefixer';
import { divide } from 'ramda';

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
  generator.array({
    template: () => {
      return {
        company: generator.company(),
        id: generator.id(),
        profession: generator.profession(),
        salary: generator.float({ min: 100, max: 19999, fixed: 2 }),
        syllable: generator.syllable(),
      };
    },
    amount: generator.natural({ min: 2, max: 5 }),
  });

describe('Table', () => {
  it('renders correctly', () => {
    const props = { columns: COLUMNS, data: generateTableData() };

    const wrapper = shallow(<Table {...props} />);
    const component = findByTestAttr(wrapper, 'cb-table');
    const rows = findByTestAttr(wrapper, 'row');

    expect(component).toHaveLength(1);
    expect(rows).toHaveLength(props.data.length);

    for (let i = 0; i < props.data.length; i++) {
      const entry = props.data[i];

      for (let column of props.columns) {
        expect(
          rows.at(i).dive().dive().find(asTestAttr(column.name)).dive().text(),
        ).toEqual(String(entry[column.name]));
      }
    }
  });
});
