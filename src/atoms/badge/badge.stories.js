import React from 'react';

import Badge from './badge';
import generator from '../../../test/data-generator';

export default {
  title: 'Atoms/Badge',
  component: Badge,
};

export function Playground(args) {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Badge ready to be played around. Try me :)
      </p>
      <Badge {...args}>{generator.name()}</Badge>
    </div>
  );
}
