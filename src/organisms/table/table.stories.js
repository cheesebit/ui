import React from 'react';

import generator from '../../../test/data-generator';
import icons from '../../atoms/icon/icon-mapping';
import { keys, capitalize } from '../../common/toolset';
import Table from './table';

export default {
  title: 'Organisms/Table',
  component: Table,
  docs: {
    description: {
      story: 'some story *a*markdown**',
    },
  },
};

const generateTableData = () =>
  generator.array({
    template: ({ index }) => {
      return {
        company: generator.company(),
        id: generator.guid(),
        profession: generator.profession(),
        salary: generator.float({ min: 100, max: 19999, fixed: 2 }),
      };
    },
    amount: generator.natural({ min: 2, max: 12 }),
  });

const data = generateTableData();

const today = new Date();
const Template = args => {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Link ready to be played around. Try me :)
      </p>

      <Table
        data={data}
        columns={[
          {
            name: 'company',
          },
          {
            name: 'profession',
          },
          {
            name: 'salary',
            props: {
              style: {
                width: '100px',
                textAlign: 'right',
              },
            },
          },
        ]}
      />
    </div>
  );
};

export const Playground = Template.bind({});
