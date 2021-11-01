import {
	getDay,
	getHours,
	getMilliseconds,
	getMinutes,
	getMonth,
	getSeconds,
	getYear,
} from './date-utils';
import DateFormatter from './date-formatter';
import { DEFAULT_OPTIONS } from './constants';

class CheesebitDate {
	static parse() {}

	/**
	 * @return {number} Current date.
	 */
	static now() {
		return Date.now();
	}

	constructor(date, options) {
		this.date = date;
		this.options = options;
	}

	/**
	 * @return {Date} Current date property.
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

	/**
	 * Set
	 *
	 * @param {string|Array} arg1 - What properties should be set or an array with `[what, value]` to be set.
	 * @param {...any} arg2 - Value to be set
	 *
	 * * day | date: Sets the day of the month for a specified date according to local time.
	 * * year: Sets the full year (e.g. 4 digits for 4-digit years) for a specified date according to local time.
	 * * hour: Sets the hours for a specified date according to local time.
	 * * minute: Sets the minutes for a specified date according to local time.
	 * * milliseconds: Sets the milliseconds for a specified date according to local time.
	 * * month: Sets the month for a specified date according to local time.
	 * * second: Sets the seconds for a specified date according to local time.
	 * * time: Sets the Date object to the time represented by a number of milliseconds since January 1, 1970, 00:00:00 UTC. Use negative numbers for times prior.
	 */
	set(arg1, ...arg2) {
		let newValues = [];

		// TODO: improve this type check
		if (Array.isArray(arg1)) {
			newValues = [...arg1];
		} else {
			newValues = [[arg1, ...arg2]];
		}

		for (const [what, ...value] of newValues) {
			switch (what) {
				case 'date':
				case 'day':
				case 'days':
					this.date.setDate(value[0]);
					break;
				case 'year':
				case 'years':
					this.date.setFullYear.apply(this.date, value);
					break;
				case 'month':
				case 'months':
					this.date.setMonth.apply(this.date, value);
				// eslint-disable-next-line no-fallthrough
				case 'hour':
				case 'hours':
					this.date.setHours.apply(this.date, value);
					break;
				case 'minute':
				case 'minutes':
					this.date.setMinutes.apply(this.date, value);
					break;
				case 'second':
				case 'seconds':
					this.date.setSeconds.apply(this.date, value);
					break;
				case 'millisecond':
				case 'milliseconds':
					this.date.setMilliseconds(value[0]);
					break;
				case 'time':
					this.date.setTime(value[0]);
					break;
			}
		}
	}

	add(arg1, arg2) {
		let increment = Object.create(null);

		// TODO: improve this type check
		if (typeof arg1 === 'object') {
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
				(increment.milliseconds || increment.millisecond || 0)
		);
	}

	subtract(arg1, arg2) {
		let increment = Object.create(null);

		// TODO: improve this type check
		if (typeof arg1 === 'object') {
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
			milliseconds:
				-1 * (increment.milliseconds || increment.millisecond || 0),
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
