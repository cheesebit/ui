import React from 'react';

import generator from '../../../test/data-generator';
import icons from '../../atoms/icon/icon-mapping';
import { keys } from '../../common/toolset';
import Select from './select';

const generateSelectOptions = () =>
  generator.array({
    template: ({ index }) => {
      const label = generator.name();

      return {
        value: generator.id(),
        label,
        icon: generator.pick(icons),
      };
    },
    amount: generator.natural({ min: 5, max: 10 }),
  });

export default {
  title: 'Molecules/Select',
  component: Select,
  docs: {
    description: {
      story: 'some story *a*markdown**',
    },
  },
};

const generateDropdownOptions = () =>
  generator.array({
    template: ({ index }) => {
      const label = generator.animal();

      return {
        id: generator.id(),
        children: label,
        icon: generator.pick(keys(icons)),
        onClick: () => {
          alert(`You clicked ${label} (Index ${index})`);
        },
      };
    },
    amount: generator.natural({ min: 2, max: 5 }),
  });

const Template = args => {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Link ready to be played around. Try me :)
      </p>

      <Select
        {...args}
        options={generateSelectOptions()}
        onChange={console.log}
      />
    </div>
  );
};

export const Playground = Template.bind({});
