import React from 'react';

import generator from '../../../test/data-generator';
import icons from '../../atoms/icon/icon-mapping';
import { keys } from '../../common/toolset';
import Dropdown from './dropdown';

export default {
  title: 'Molecules/Dropdown',
  component: Dropdown,
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

      <div className="flex flex-row space-x-4">
        <Dropdown
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
          items={generateDropdownOptions()}
        />
        <Dropdown
          unroll="block"
          toggle="Action"
          items={generateDropdownOptions()}
          className="w-64"
        />
        <Dropdown
          toggle={({ disabled, collapsed, onClick }) => (
            <Dropdown.Toggle
              disabled={disabled}
              collapsed={collapsed}
              onClick={onClick}
              icon="more-horizontal"
              borderless
            />
          )}
          items={generateDropdownOptions()}
          unroll="left"
        />
      </div>
    </div>
  );
};

export const Playground = Template.bind({});
