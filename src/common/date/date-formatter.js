import {
  getYear,
  getMonth,
  getDay,
  getDayOfWeek,
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
} from './date-utils';
import parser from './date-parser';
import { DEFAULT_OPTIONS, EXPECTED_EXP } from './constants';

function getStringYear(date) {
  return String(getYear(date));
}

function getStringMonth(date) {
  return String(getMonth(date));
}

function getStringDay(date) {
  return String(getDay(date));
}

function getStringHours(date) {
  return String(getHours(date));
}

function getStringMinutes(date) {
  return String(getMinutes(date));
}

function getStringSeconds(date) {
  return String(getSeconds(date));
}

function getStringMilliseconds(date) {
  return String(getMilliseconds(date));
}

/**
 * Date formatter
 * @param {Date} date - Date to be formatted.
 */
class DateFormatter {
  /**
   * @constructor
   * @param {*} pattern
   * @param {object} options
   * @param {Array<string>|string} options.delimiters - Accepted delimiters for the given pattern.
   */
  constructor(pattern, options) {
    this.options = options;
    this.pattern = parser(EXPECTED_EXP, this.options.delimiters)(pattern);
  }

  get pattern() {
    return this._pattern;
  }

  set pattern(pattern) {
    this._pattern = pattern;
  }

  get options() {
    return this._options;
  }

  set options(options) {
    this._options = { ...DEFAULT_OPTIONS, ...options };
  }

  /**
   *
   * @param {Date} date
   * @returns {string}
   */
  format(date) {
    const options = this.options;
    const pattern = this._pattern;

    // TODO: validate `date`
    // TODO: think of a better way to extract date pieces regarding options

    var formatted = '';

    const year = getStringYear(date);
    const month = getMonth(date);
    const day = getStringDay(date);
    const dayOfWeek = getDayOfWeek(date);
    const hours = getStringHours(date);
    const minutes = getStringMinutes(date);
    const seconds = getStringSeconds(date);
    const milliseconds = getStringMilliseconds(date);

    for (let part of pattern) {
      switch (part) {
        case 'YYYY':
          formatted = formatted + year; // 2020
          break;
        case 'YY':
          formatted = formatted + year.substring(2); // 20
          break;
        case 'MMMM':
          formatted = formatted + options.months[month].long; // September
          break;
        case 'MMM':
          formatted = formatted + options.months[month].short; // Sep
          break;
        case 'MM':
          formatted =
            formatted + String(options.months[month].numeric).padStart(2, '0'); // 09
          break;
        case 'M':
          formatted = formatted + String(options.months[month].numeric); // 9
          break;
        case 'WWW':
          formatted = formatted + options.week[dayOfWeek].long; // Monday
          break;
        case 'WW':
          formatted = formatted + options.week[dayOfWeek].short; // Mon
          break;
        case 'W':
          formatted = formatted + options.week[dayOfWeek].short[0]; // Mon
          break;
        case 'DD':
          formatted = formatted + day.padStart(2, '0'); // 01
          break;
        case 'D':
          formatted = formatted + day; // 1
          break;
        case 'hh':
          formatted = formatted + hours.padStart(2, '0');
          break;
        case 'h':
          formatted = formatted + hours;
          break;
        case 'mm':
          formatted = formatted + minutes.padStart(2, '0');
          break;
        case 'm':
          formatted = formatted + minutes;
          break;
        case 'ss':
          formatted = formatted + seconds.padStart(2, '0');
          break;
        case 's':
          formatted = formatted + seconds;
          break;
        case 'll':
          formatted = formatted + milliseconds.padStart(3, '0');
          break;
        case 'l':
          formatted = formatted + milliseconds;
          break;
        default:
          formatted = formatted + part;
      }
    }

    return formatted;
  }

  /**
   *
   * @param {string} text
   * @returns {Date}
   */
  parse(text) {
    throw Error('Not implemented');
  }
}

export default DateFormatter;
