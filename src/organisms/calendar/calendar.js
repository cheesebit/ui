import React from 'react';
import clsx from 'clsx';

import {} from '../wizard/index';
import { Input } from '../../atoms/input';
import { Button } from '../../atoms/button';
import { Dropdown } from '../../molecules/dropdown';
import { Icon } from '../../atoms/icon';
import useDate from './use-date';

import './calendar.scss';

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
function Calendar({ className }) {
  const { date, actions, dispatch } = useDate({
    day: 8,
    month: 8, // setembro
    year: 2020,
  });
  // const [date, setDate] = React.useState({
  //   day: 8,
  //   month: 9,
  //   year: 2020,
  // });

  // function handleChange(e) {
  //   const {
  //     target: { name, value },
  //   } = e;
  //   setDate(date => ({ ...date, [name]: parseInt(value, 10) }));
  // }

  const skip = new Date(date.year, date.month - 1).getDay();
  const days = 40 - new Date(date.year, date.month - 1, 40).getDate();

  return (
    <div className={clsx('cb-calendar', className)}>
      <p>Calendar</p>

      {/* <div className="menu">Meby</div> */}

      <Dropdown
        collapsed={false}
        toggle={({ disabled, collapsed, onClick }) => (
          <div className="input-toggle" onFocus={null}>
            <Input
              borderless
              paddingless={['horizontal']}
              className="input-day"
              type="number"
              name="day"
              value={date.day}
              readOnly
            />
            /
            <Input
              borderless
              paddingless={['horizontal']}
              className="input-month"
              type="number"
              name="month"
              value={date.month + 1}
              readOnly
            />
            /
            <Input
              borderless
              paddingless={['horizontal']}
              className="input-year"
              type="number"
              name="year"
              value={date.year}
              readOnly
            />
          </div>
          // <Dropdown.Toggle
          //   disabled={disabled}
          //   collapsed={collapsed}
          //   onClick={onClick}
          //   icon="more-horizontal"
          //   borderless
          // />
        )}
        unroll="right"
      >
        <Dropdown.Items>
          <div className="year-selector">
            <Button
              className="batata"
              emphasis="text"
              size="small"
              paddingless
              onClick={() => {
                dispatch(actions.decrementYear(1));

                // dispatch({
                //   type: actions.decrementYear.type,
                //   payload: 1,
                // });
              }}
            >
              &laquo;
            </Button>
            <Button
              className="batata"
              emphasis="text"
              size="small"
              paddingless
              onClick={() => {
                dispatch(actions.decrementMonth(1));
              }}
            >
              <Icon name="chevron-left" />
            </Button>
            <div className="year-month-display">
              <span className="year">{date.year}</span>
              <span className="month">{MONTH[date.month]}</span>
            </div>
            <Button
              className="batata"
              emphasis="text"
              size="small"
              paddingless
              onClick={() => {
                dispatch(actions.incrementMonth(1));
              }}
            >
              <Icon name="chevron-right" />
            </Button>
            <Button
              className="batata"
              emphasis="text"
              size="small"
              paddingless
              onClick={() => {
                dispatch(actions.incrementYear(1));
              }}
            >
              &raquo;
            </Button>
          </div>
          <div className="days">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <span key={day} className="day week-day">
                {day}
              </span>
            ))}

            {[...[...Array(skip)].map(() => '')].map((_, i) => (
              <span key={`empty-${i}`} />
            ))}
            {[...[...Array(days)].map((_, n) => n + 1)].map((d, i) => (
              <Button
                size="small"
                emphasis="text"
                key={i}
                className="day"
                onClick={() => alert('Você selecionou dia ' + d)}
                paddingless
              >
                {d}
              </Button>
            ))}
          </div>
        </Dropdown.Items>
      </Dropdown>
    </div>
  );
}

export default Calendar;
