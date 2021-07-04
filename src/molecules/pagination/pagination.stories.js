import React from 'react';
import { action } from '@storybook/addon-actions';

import Pagination from './pagination';

export default {
  title: 'Molecules/Pagination',
  component: Pagination,
};

export function Playground(args) {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Pagination ready to be played around. Try me :)
      </p>

      <Pagination onChange={action('pagination')} {...args} />
    </div>
  );
}

Playground.args = {
  totalItems: 1000,
};
