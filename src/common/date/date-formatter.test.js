import DateFormatter from './date-formatter';
import CheesebitDate from './date';

describe('DateFormatter', () => {
  describe('simple formatter', () => {});

  describe('complex formatter', () => {
    it('format with ISO format', () => {
      const formatter = new DateFormatter('YYYY-MM-DDThh:mm:ss.llZ');

      const date = new Date('2021-06-30T10:00:00.000-03:00');
      expect(formatter.format(date)).toBe('2021-06-30T10:00:00.000Z');
    });
  });
});
