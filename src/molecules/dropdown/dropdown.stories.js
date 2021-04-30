import React from 'react';

import generator from '../../../test/data-generator';
import icons from '../../atoms/icon/icon-mapping';
import { keys } from '../../common/toolset';
import Dropdown from './dropdown';

export default {
  title: 'Molecules/Dropdown',
  component: Dropdown,
};

const generateDropdownOptions = () =>
  generator.array(({ index }) => {
    const label = generator.animal();

    return {
      id: generator.id(),
      children: label,
      icon: generator.pick(keys(icons)),
      onClick: () => {
        alert(`You clicked ${label} (Index ${index})`);
      },
    };
  }, generator.natural({ min: 2, max: 5 }));

export function Playground(args) {
  return (
    <div className="block">
      <p className="mb-2">This is me, a cool Dropdown.</p>
      <p className="mb-2">
        As I'm <b>still a work in progress</b>, there's some maintenance going
        on, but soon enough you will be able to try me :)
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
}
