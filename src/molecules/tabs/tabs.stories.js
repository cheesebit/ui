import React from 'react';

import generator from '../../../test/data-generator';
import icons from '../../atoms/icon/icon-mapping';
import { keys, capitalize } from '../../common/toolset';
import Tabs from './tabs';

const generateTabs = (options = { min: 2, max: 5 }) =>
  generator.array(() => {
    return {
      id: generator.id(),
      props: {
        children: capitalize(generator.word({ length: 7 })),
      },
    };
  }, generator.natural(options));

const tabs = generateTabs({ min: 4, max: 20 });

export default {
  title: 'Molecules/Tabs',
  component: Tabs,
};

export function Playground(args) {
  return (
    <div className="block">
      <p className="mb-2">This is me, a cool Tabs.</p>

      <p className="mb-2">
        As I'm <b>still a work in progress</b>, there's some maintenance going
        on, but soon enough you will be able to try me :)
      </p>

      <Tabs {...args} items={tabs} />
    </div>
  );
}
