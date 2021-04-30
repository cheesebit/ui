import React from 'react';

import generator from '../../../test/data-generator';
import Table from './table';

export default {
  title: 'Organisms/Table',
  component: Table,
};

const generateTableData = () =>
  generator.array(({ index }) => {
    return {
      company: generator.company(),
      id: generator.guid(),
      profession: generator.profession(),
      salary: generator.float({ min: 100, max: 19999, fixed: 2 }),
    };
  }, generator.natural({ min: 2, max: 12 }));

const data = generateTableData();

export function Playground(args) {
  return (
    <div className="block w-full">
      <p className="mb-2">
        This is me, a cool Table, <b>still a work in progress</b>, but you can
        play me around. Try me :)
      </p>

      <Table
        {...args}
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
}
