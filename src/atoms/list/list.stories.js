import React from 'react';

import { Checkbox } from '../checkbox';
import { range, values } from '../../common/toolset';
import generator from '../../../test/data-generator';
import List from './list';

export default {
  title: 'Atoms/List',
  component: List,
  docs: {
    description: {
      story: 'some story *a*markdown**',
    },
  },
  argTypes: {
    bordered: {
      control: {
        type: 'boolean',
      },
    },
    striped: {
      control: {
        type: 'boolean',
      },
    },
    hoverable: {
      control: {
        type: 'boolean',
      },
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
