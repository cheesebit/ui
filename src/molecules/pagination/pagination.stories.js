import React from 'react';

import generator from '../../../test/data-generator';
import icons from '../../atoms/icon/icon-mapping';
import { keys } from '../../common/toolset';
import Pagination from './pagination';

export default {
  title: 'Molecules/Pagination',
  component: Pagination,
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

      <Pagination onChange={console.log} totalItems={1000} />
    </div>
  );
};

export const Playground = Template.bind({});
