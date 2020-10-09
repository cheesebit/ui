import {
  getComparable,
  getYear,
  getMonth,
  getDay,
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
} from './date-utils';
import DateFormatter from './date-formatter';
import { DEFAULT_OPTIONS } from './constants';

class CheesebitDate {
  static parse(text, formatter) {}

  /**
   * @returns {number}
   */
  static now() {
    return Date.now();
  }

  constructor(date, options) {
    this.date = date;
    this.options = options;
  }

  /**
   * @returns {Date}
   */
  get date() {
    return this._date;
  }

  set date(date) {
    this._date = date || new Date();
  }

  get options() {
    return this._options;
  }

  set options(options) {
    this._options = options || DEFAULT_OPTIONS;
  }

  add(arg1, arg2) {
    let increment = Object.create(null);

    // TODO: improve this type check
    if (typeof arg1 == 'object') {
      // TODO: validate `time`
      increment = {
        ...arg1,
      };
    } else {
      const time = arg2;
      const amount = arg1;

      // TODO: validate `time`
      increment = {
        [time]: amount,
      };
    }

    const currDate = this.date;

    // TODO: add object support to allow operation like add({days:7,months:1})
    this.date = new Date(
      getYear(currDate) + (increment.years || increment.year || 0),
      getMonth(currDate) + (increment.months || increment.month || 0),
      getDay(currDate) + (increment.days || increment.day || 0),
      getHours(currDate) + (increment.hours || increment.hour || 0),
      getMinutes(currDate) + (increment.minutes || increment.minute || 0),
      getSeconds(currDate) + (increment.seconds || increment.second || 0),
      getMilliseconds(currDate) +
        (increment.milliseconds || increment.millisecond || 0),
    );
  }

  subtract(arg1, arg2) {
    let increment = Object.create(null);

    // TODO: improve this type check
    if (typeof arg1 == 'object') {
      // TODO: validate `time`
      increment = {
        ...arg1,
      };
    } else {
      const time = arg2;
      const amount = arg1;

      // TODO: validate `time`
      increment = {
        [time]: amount,
      };
    }

    this.add({
      years: -1 * (increment.years || increment.year || 0),
      months: -1 * (increment.months || increment.month || 0),
      days: -1 * (increment.days || increment.day || 0),
      hours: -1 * (increment.hours || increment.hour || 0),
      minutes: -1 * (increment.minutes || increment.minute || 0),
      seconds: -1 * (increment.seconds || increment.second || 0),
      milliseconds: -1 * (increment.milliseconds || increment.millisecond || 0),
    });
  }

  /**
   *
   * @param {DateFormatter} formatter
   */
  format(formatter) {
    return formatter.format(this.date);
  }
}

export default CheesebitDate;
