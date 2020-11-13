import React from 'react';

import generator from '../../../test/data-generator';
import Link from './link';

export default {
  title: 'Welcome/Atoms/Link',
  component: Link,
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

      <Link {...args}>{generator.profession()}</Link>
    </div>
  );
};

export const Playground = Template.bind({});
