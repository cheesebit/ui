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

/**
 * Date formatter
 *
 * @param {Date} date - Date to be formatted.
 */
class DateFormatter {
	/**
	 * @class
	 * @param {string} pattern
	 * @param {Object} [options]
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
	 * @return {string} Returns `date` formatted based on the given pattern.
	 */
	format(date) {
		const options = this.options;
		const pattern = this._pattern;

		/**
		 * "The timezone is always zero UTC offset, as denoted by the suffix "Z"
		 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
		 */
		// const isZeroUTCOffset = pattern.includes( 'Z' );
		// TODO: handle zero UTC offset

		// TODO: validate `date`
		// TODO: think of a better way to extract date pieces regarding options

		let formatted = '';

		const year = getYear(date);
		const month = getMonth(date);
		const day = getDay(date);
		const dayOfWeek = getDayOfWeek(date);
		const hours = getHours(date);
		const minutes = getMinutes(date);
		const seconds = getSeconds(date);
		const milliseconds = getMilliseconds(date);
		// const timezoneOffset = getTimezoneOffset( date );

		for (const part of pattern) {
			switch (part) {
				case 'YYYY':
					formatted = formatted + year; // 2020
					break;
				case 'YY':
					formatted = formatted + String(year).substring(2); // 20
					break;
				case 'MMMM':
					formatted = formatted + options.months[month].long; // September
					break;
				case 'MMM':
					formatted = formatted + options.months[month].short; // Sep
					break;
				case 'MM':
					formatted =
						formatted +
						String(options.months[month].numeric).padStart(2, '0'); // 09
					break;
				case 'M':
					formatted =
						formatted + String(options.months[month].numeric); // 9
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
					formatted = formatted + String(day).padStart(2, '0'); // 01
					break;
				case 'D':
					formatted = formatted + day; // 1
					break;
				case 'hh':
					formatted = formatted + String(hours).padStart(2, '0');
					break;
				case 'h':
					formatted = formatted + hours;
					break;
				case 'mm':
					formatted = formatted + String(minutes).padStart(2, '0');
					break;
				case 'm':
					formatted = formatted + minutes;
					break;
				case 'ss':
					formatted = formatted + String(seconds).padStart(2, '0');
					break;
				case 's':
					formatted = formatted + seconds;
					break;
				case 'll':
					formatted =
						formatted + String(milliseconds).padStart(3, '0');
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

	parse() {
		throw Error('Not implemented');
	}
}

export default DateFormatter;
