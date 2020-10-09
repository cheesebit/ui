import React from 'react';
import clsx from 'clsx';

import {} from '../wizard/index';
import { Input } from '../../atoms/input';
import { Button } from '../../atoms/button';
import { Dropdown } from '../../molecules/dropdown';
import { Icon } from '../../atoms/icon';
import { Calendar } from '../calendar';

import './date-picker.scss';

const MONTH = {
  0: 'Janeiro',
  1: 'Fevereiro',
  2: 'Março',
  3: 'Abril',
  4: 'Maio',
  5: 'Junho',
  6: 'Julho',
  7: 'Agosto',
  8: 'Setembro',
  9: 'Outubro',
  10: 'Novembro',
  11: 'Dezembro',
};
function DatePicker({ className, value }) {
  return (
    <div className={clsx('cb-date-picker', className)}>
      <Dropdown
        collapsed={false}
        toggle={({ disabled, collapsed, onClick }) => (
          <div className="input-toggle" onFocus={null}>
            <Input
              name="day"
              className="input"
              //value={`${date.month}/${date.day}/${date.year}`}
              onChange={function (e) {
                const {
                  target: { value },
                } = e;

                // 1

                var input = value;
                const parts = `${input}`.match(/(\d{1,2})-(\d{1,2})-(\d{4})/);

                if (parts == null) {
                  input = input.replace(/[\W\s\._\-]+/g, '');
                  console.log(input);
                }
                {
                  console.log(input, parts);
                }
                // 2
              }}
            />
          </div>
        )}
        unroll="right"
      >
        <Dropdown.Items>
          <Calendar date={value} />
        </Dropdown.Items>
      </Dropdown>
    </div>
  );
}

DatePicker.defaultProps = {
  value: new Date(),
};

export default DatePicker;
