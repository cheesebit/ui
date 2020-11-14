import React from 'react';
import clsx from 'clsx';
import generator from '../../../test/data-generator';
import ShortcutWatcher from './shortcut-watcher';

export default {
  title: 'HOCs/ShortcutWatcher',
  component: ShortcutWatcher,
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

      <div>TODO</div>
    </div>
  );
};

export const Playground = Template.bind({});
