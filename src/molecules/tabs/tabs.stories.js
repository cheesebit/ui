import React from 'react';

import generator from '../../../test/data-generator';
import icons from '../../atoms/icon/icon-mapping';
import { keys, capitalize } from '../../common/toolset';
import Tabs from './tabs';

const generateTabs = (options = { min: 2, max: 5 }) =>
  generator.array({
    template: ({ index }) => {
      return {
        id: generator.id(),
        props: {
          children: capitalize(generator.word({ length: 7 })),
        },
      };
    },
    amount: generator.natural(options),
  });

const tabs = generateTabs({ min: 4, max: 20 });

export default {
  title: 'Molecules/Tabs',
  component: Tabs,
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
        This is me, a cool Link ready to be played around. Try me :)
      </p>

      <Tabs {...args} items={tabs} />
    </div>
  );
};

export const Playground = Template.bind({});
