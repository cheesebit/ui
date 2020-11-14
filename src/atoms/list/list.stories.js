import React from 'react';

import generator from '../../../test/data-generator';
import { range, values } from '../../common/toolset';
import { Checkbox } from '../checkbox';
import List from './list';

export default {
  title: 'Atoms/List',
  component: List,
  docs: {
    description: {
      story: 'some story *a*markdown**',
    },
  },
};

const Template = args => {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool List ready to be played around. Try me :)
      </p>

      <List {...args}>
        {range(0, generator.natural({ min: 5, max: 10 })).map(value => (
          <List.Item
            key={value}
            leading={
              <Checkbox
                id={value}
                aria-label="List item 1"
                name="list"
                value={value}
              />
            }
            as="label"
          >
            {generator.sentence()}
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export const Playground = Template.bind({});
