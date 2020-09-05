import React from 'react';
import clsx from 'clsx';

import {} from '../wizard/index';
import { Input } from '../../atoms/input';
import { Button } from '../../atoms/button';
import { Dropdown } from '../../molecules/dropdown';

import './calendar.scss';

function Calendar({ className }) {
  return (
    <div className={clsx('cb-calendar', className)}>
      <p>Calendar</p>

      {/* <div className="menu">Meby</div> */}

      <Dropdown
        toggle={({ disabled, collapsed, onClick }) => (
          <div className="input-toggle" onFocus={onClick}>
            <Input borderless className="day" type="number" />
            /
            <Input borderless className="month" type="number" />
            /
            <Input borderless className="year" type="number" />
          </div>
          // <Dropdown.Toggle
          //   disabled={disabled}
          //   collapsed={collapsed}
          //   onClick={onClick}
          //   icon="more-horizontal"
          //   borderless
          // />
        )}
        unroll="left"
      >
        <Dropdown.Items>
          <div className="days">
            {[...Array(31).keys()].map(i => (
              <button
                key={i}
                className="day"
                onClick={() => alert('Você selecionou dia ' + (i + 1))}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </Dropdown.Items>
      </Dropdown>
    </div>
  );
}

export default Calendar;
