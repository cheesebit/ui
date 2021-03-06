import React from 'react';

import DatePicker from './date-picker';

export default {
  title: 'Organisms/DatePicker',
  component: DatePicker,
};

const today = new Date();

export function Playground(args) {
  return (
    <div className="block">
      <p className="mb-2">This is me, a cool DatePicker.</p>
      <p className="mb-2">
        As I'm <b>still a work in progress</b>, there's some maintenance going
        on, but soon enough you will be able to try me :)
      </p>

      <DatePicker {...args} value={today} />
    </div>
  );
}
