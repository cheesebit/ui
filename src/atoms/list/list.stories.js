import React from 'react';

import generator from '../../../test/data-generator';
import { Checkbox } from '../checkbox';
import List from './list';

export default {
  title: 'Welcome/Atoms/List',
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
        <List.Item
          leading={
            <Checkbox id="1" aria-label="List item 1" name="list" value="1" />
          }
          as="label"
        >
          {generator.sentence()}
        </List.Item>
        <List.Item
          leading={
            <Checkbox id="2" aria-label="List item 2" name="list" value="2" />
          }
          as="label"
        >
          {generator.sentence()}
        </List.Item>
      </List>
    </div>
  );
};

export const Playground = Template.bind({});
