import React from 'react';

import generator from '../../../test/data-generator';
import icons from '../../atoms/icon/icon-mapping';
import { keys, capitalize } from '../../common/toolset';
import DatePicker from './date-picker';

export default {
  title: 'Organisms/DatePicker',
  component: DatePicker,
  docs: {
    description: {
      story: 'some story *a*markdown**',
    },
  },
};

const today = new Date();
const Template = args => {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Link ready to be played around. Try me :)
      </p>

      <DatePicker {...args} value={today} />
    </div>
  );
};

export const Playground = Template.bind({});
