import DateFormatter from './date-formatter';

describe('DateFormatter', () => {
	describe('simple formatter', () => {});

	describe('complex formatter', () => {
		// FIX: this test is broken on CI
		it.skip('format with ISO format', () => {
			const formatter = new DateFormatter('YYYY-MM-DDThh:mm:ss.llZ');

			const date = new Date('2021-06-30T10:00:00.000-03:00');
			expect(formatter.format(date)).toBe('2021-06-30T13:00:00.000Z');
		});
	});
});
