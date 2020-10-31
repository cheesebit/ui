import { isNil } from '../../common/toolset';

/**
 * Get day of month for the given date.
 * @param {Date} date - date
 */
export function getDay(date) {
  if (isNil(date)) {
    return null;
  }

  return date.getDate();
}

/**
 * Get day of month for the given date.
 * @param {Date} date - date
 */
export function getDayOfWeek(date) {
  if (isNil(date)) {
    return null;
  }

  return date.getDay();
}

/**
 * Get month for the given date.
 * @param {Date} date - date
 */
export function getMonth(date) {
  if (isNil(date)) {
    return null;
  }

  return date.getMonth();
}

/**
 * Get year for the given date.
 * @param {Date} date - date
 */
export function getYear(date) {
  if (isNil(date)) {
    return null;
  }

  return date.getFullYear();
}

/**
 * Get hours for the given date.
 * @param {Date} date - date
 */
export function getHours(date) {
  if (isNil(date)) {
    return null;
  }

  return date.getHours();
}

/**
 * Get minutes for the given date.
 * @param {Date} date - date
 */
export function getMinutes(date) {
  if (isNil(date)) {
    return null;
  }

  return date.getMinutes();
}

/**
 * Get seconds for the given date.
 * @param {Date} date - date
 */
export function getSeconds(date) {
  if (isNil(date)) {
    return null;
  }

  return date.getSeconds();
}

/**
 * Get milliseconds for the given date.
 * @param {Date} date - date
 */
export function getMilliseconds(date) {
  if (isNil(date)) {
    return null;
  }

  return date.getMilliseconds();
}

/**
 * Get comparable string for the given date.
 * @param {Date} date - date
 * @returns {string}
 */
export function getComparable(date) {
  if (isNil(date)) {
    return null;
  }

  return `${getYear(date) ?? '9999'}${String(getMonth(date) ?? 11).padStart(
    2,
    '0',
  )}${String(getDay(date) ?? 31).padStart(2, '0')}${String(
    getHours(date) ?? 23,
  ).padStart(2, '0')}${String(getMinutes(date) ?? 59).padStart(2, '0')}${String(
    getSeconds(date) ?? 59,
  ).padStart(2, '0')}${String(getMilliseconds(date) ?? 999).padStart(3, '0')}`;
}
