import React from 'react';
import clsx from 'clsx';

import { Button } from '../../atoms/button';
import { Icon } from '../../atoms/icon';
import useDate from './use-date';
import {
  getDay,
  getYear,
  getMonth,
  getComparable,
} from '../../common/date/date-utils';

import CBDate from '../../common/date/date';

import './calendar.scss';
import DateFormatter from '../../common/date/date-formatter';

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

const t = new CBDate();
t.set('hour', 0, 0, 0, 0);

const f = new DateFormatter('WWW, DD/MMM/YYYY h:m:s', {
  // delimiters: [' ', 'de', ','],
});
console.log('DateFormatter', t.date, t.format(f));

const today = t.date;

function Calendar({ id, name, date: dateProp, className, onChange }) {
  const { date, actions, dispatch } = useDate(dateProp);
  const [selected, setSelected] = React.useState(
    [
      getComparable(new Date(2020, 8, 22)),
      getComparable(new Date(2020, 8, 23)),
      getComparable(new Date(2020, 8, 24)),
      // getComparable(new Date(2020, 8, 25)),
      getComparable(today),
      getComparable(new Date(2020, 8, 27)),
      // getComparable(new Date(2020, 8, 28)),
      getComparable(new Date(2020, 8, 29)),
    ].reduce((map, d) => {
      return {
        ...map,
        [d]: true,
      };
    }, {}),
  );
  const skip = new Date(getYear(date), getMonth(date)).getDay();
  const days = 40 - new Date(getYear(date), getMonth(date), 40).getDate();

  // TODO: i18N
  // TODO: Date format

  return (
    <div className={clsx('cb-calendar', className)}>
      <div className="header">
        <Button
          className="previous-year"
          emphasis="text"
          size="small"
          paddingless
          onClick={() => {
            dispatch(actions.subtract(1, 'year'));
          }}
        >
          &laquo;
        </Button>
        <Button
          className="previous-month"
          emphasis="text"
          size="small"
          paddingless
          onClick={() => {
            dispatch(actions.subtract(1, 'month'));
          }}
        >
          <Icon size={16} name="chevron-left" />
        </Button>
        <div className="date-display">
          <span className="year">{getYear(date)}</span>
          <span className="month">{MONTH[getMonth(date)]}</span>
        </div>
        <Button
          className="next-year"
          emphasis="text"
          size="small"
          paddingless
          onClick={() => {
            dispatch(actions.add(1, 'month'));
          }}
        >
          <Icon size={16} name="chevron-right" />
        </Button>
        <Button
          className="next-month"
          emphasis="text"
          size="small"
          paddingless
          onClick={() => {
            dispatch(actions.add(1, 'year'));
          }}
        >
          &raquo;
        </Button>
      </div>
      <div className="days">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <abbr key={day} className="day week-day" title="Thursday">
            {day}
          </abbr>
        ))}

        {[...[...Array(skip)].map(() => '')].map((_, i) => (
          <span key={`empty-${i}`} />
        ))}
        {[...[...Array(days)].map((_, n) => n + 1)].map((d, i) => {
          const currentDay = new Date(getYear(date), getMonth(date), d);

          const isToday = getComparable(today) == getComparable(currentDay);
          const isSelected = Boolean(selected[getComparable(currentDay)]);

          return (
            <Button
              size="small"
              emphasis="text"
              key={i}
              className={clsx('day', {
                'is-today': isToday,
                'is-selected': isSelected,
              })}
              onClick={() => {
                console.log('Você selecionou dia ' + d);
                dispatch(actions.set(currentDay));

                const comparable = getComparable(currentDay);
                setSelected({
                  ...selected,
                  [comparable]: !Boolean(selected[comparable] || false),
                });
                onChange &&
                  onChange({
                    target: { id, name, value: currentDay },
                  });
              }}
              paddingless
            >
              {d}
            </Button>
          );
        })}
      </div>
      <div className="quick-actions">
        <Button
          size="small"
          onClick={() => {
            dispatch(actions.set(today));

            onChange &&
              onChange({
                target: { id, name, value: today },
              });
          }}
        >
          Today
        </Button>
      </div>
    </div>
  );
}

Calendar.defaultProps = {
  date: today,
};

export default Calendar;
