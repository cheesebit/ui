import { checkHref, checkTarget, sanitizeProps } from './link.helpers';
import generator from '../../../test/data-generator';

describe('Link helpers', () => {
	describe('checking href', () => {
		it('returns props untouched if no href is provided', () => {
			const props = {};

			expect(checkHref(props)).toEqual(props);
		});

		it('returns props untouched if no unsafe href is provided', () => {
			const props = {
				href: generator.url(),
			};

			expect(checkHref(props)).toEqual(props);
		});

		it('returns props without href if an unsafe href is provided', () => {
			const safeProps = {};
			const props = {
				...safeProps,
				href: 'javascript:copySecureData()',
			};

			expect(checkHref(props)).toEqual(safeProps);
		});
	});

	describe('checking target', () => {
		it('returns props untouched if no target is provided', () => {
			const props = {
				href: generator.url(),
			};

			expect(checkTarget(props)).toEqual(props);
		});

		it('sets rel to "noreferrer" when a target is provided with no rel attribute', () => {
			const props = {
				href: generator.url(),
				target: '_self',
			};

			expect(checkTarget(props)).toEqual({
				...props,
				rel: 'noreferrer',
			});
		});

		it('appends a "noreferrer" to the rel attribute when a target and rel is provided', () => {
			const props = {
				href: generator.url(),
				target: '_self',
				rel: 'noopener',
			};

			expect(checkTarget(props)).toEqual({
				...props,
				rel: `${'noopener'} ${'noreferrer'}`,
			});
		});

		it('appends a "noopener" to the rel attribute when a target "blank"', () => {
			const props = {
				href: generator.url(),
				target: '_blank',
				rel: 'noreferrer',
			};

			expect(checkTarget(props)).toEqual({
				...props,
				rel: `${'noreferrer'} ${'noopener'}`,
			});
		});

		it('appends a "noreferrer" to the existing rel attribute when a target "blank"', () => {
			const props = {
				href: generator.url(),
				target: '_blank',
				rel: 'noopener',
			};

			expect(checkTarget(props)).toEqual({
				...props,
				rel: `${'noopener'} ${'noreferrer'}`,
			});
		});
	});

	it('runs all checks when calling sanitizeProps', () => {
		const safeProps = {
			target: '_blank',
		};
		const props = {
			...safeProps,
			href: 'javascript:copySecureData()',
		};

		expect(sanitizeProps(props)).toEqual({
			...safeProps,
			rel: `${'noopener'} ${'noreferrer'}`,
		});
	});
});
