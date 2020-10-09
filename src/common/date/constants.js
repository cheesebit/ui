export const DEFAULT_OPTIONS = {
  delimiters: [' ', '-', '/'],
  week: {
    0: {
      short: 'Mon',
      long: 'Monday',
    },
    1: {
      short: 'Tue',
      long: 'Tuesday',
    },
    2: {
      short: 'Wed',
      long: 'Wednesday',
    },
    3: {
      short: 'Thu',
      long: 'Thursday',
    },
    4: {
      short: 'Fri',
      long: 'Friday',
    },
    5: {
      short: 'Sat',
      long: 'Saturday',
    },
    6: {
      short: 'Sun',
      long: 'Sunday',
    },
  },
  months: {
    0: {
      numeric: 1,
      short: 'Jan',
      long: 'January',
    },
    1: {
      numeric: 2,
      short: 'Feb',
      long: 'February',
    },
    2: {
      numeric: 3,
      short: 'Mar',
      long: 'March',
    },
    3: {
      numeric: 4,
      short: 'Apr',
      long: 'April',
    },
    4: {
      numeric: 5,
      short: 'May',
      long: 'May',
    },
    5: {
      numeric: 6,
      short: 'Jun',
      long: 'June',
    },
    6: {
      numeric: 7,
      short: 'Jul',
      long: 'July',
    },
    7: {
      numeric: 8,
      short: 'Aug',
      long: 'August',
    },
    8: {
      numeric: 9,
      short: 'Sep',
      long: 'September',
    },
    9: {
      numeric: 10,
      short: 'Oct',
      long: 'October',
    },
    10: {
      numeric: 11,
      short: 'Nov',
      long: 'November',
    },
    1: {
      numeric: 10,
      short: 'Dec',
      long: 'December',
    },
  },
};

export const EXPECTED_EXP = [
  'YYYY',
  'YY',
  'MMMM',
  'MMM',
  'MM',
  'M',
  'WWW',
  'WW',
  'W',
  'DD',
  'D',
  'hh',
  'h',
  'mm',
  'm',
  'ss',
  's',
  'll',
  'l',
];
