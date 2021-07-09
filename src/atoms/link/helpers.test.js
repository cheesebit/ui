import { checkHref, checkTarget, sanitizeProps } from './helpers';
import { Target, Rel } from './link';
import generator from '../../../test/data-generator';

describe( 'Link helpers', () => {
	describe( 'checking href', () => {
		it( 'returns props untouched if no href is provided', () => {
			const props = {
				alt: generator.sentence(),
			};

			expect( checkHref( props ) ).toEqual( props );
		} );

		it( 'returns props untouched if no unsafe href is provided', () => {
			const props = {
				alt: generator.sentence(),
				href: generator.url(),
			};

			expect( checkHref( props ) ).toEqual( props );
		} );

		it( 'returns props without href if an unsafe href is provided', () => {
			const safeProps = {
				alt: generator.sentence(),
			};
			const props = {
				...safeProps,
				href: 'javascript:copySecureData()',
			};

			expect( checkHref( props ) ).toEqual( safeProps );
		} );
	} );

	describe( 'checking target', () => {
		it( 'returns props untouched if no target is provided', () => {
			const props = {
				alt: generator.sentence(),
				href: generator.url(),
			};

			expect( checkTarget( props ) ).toEqual( props );
		} );

		it( 'sets rel to "noreferrer" when a target is provided with no rel attribute', () => {
			const props = {
				alt: generator.sentence(),
				href: generator.url(),
				target: Target.self,
			};

			expect( checkTarget( props ) ).toEqual( {
				...props,
				rel: Rel.noreferrer,
			} );
		} );

		it( 'appends a "noreferrer" to the rel attribute when a target and rel is provided', () => {
			const props = {
				alt: generator.sentence(),
				href: generator.url(),
				target: Target.self,
				rel: Rel.noopener,
			};

			expect( checkTarget( props ) ).toEqual( {
				...props,
				rel: `${ Rel.noopener } ${ Rel.noreferrer }`,
			} );
		} );

		it( 'appends a "noopener" to the rel attribute when a target "blank"', () => {
			const props = {
				alt: generator.sentence(),
				href: generator.url(),
				target: Target.blank,
				rel: Rel.noreferrer,
			};

			expect( checkTarget( props ) ).toEqual( {
				...props,
				rel: `${ Rel.noreferrer } ${ Rel.noopener }`,
			} );
		} );

		it( 'appends a "noreferrer" to the existing rel attribute when a target "blank"', () => {
			const props = {
				alt: generator.sentence(),
				href: generator.url(),
				target: Target.blank,
				rel: Rel.noopener,
			};

			expect( checkTarget( props ) ).toEqual( {
				...props,
				rel: `${ Rel.noopener } ${ Rel.noreferrer }`,
			} );
		} );
	} );

	it( 'runs all checks when calling sanitizeProps', () => {
		const safeProps = {
			alt: generator.sentence(),
			target: Target.blank,
		};
		const props = {
			...safeProps,
			href: 'javascript:copySecureData()',
		};

		expect( sanitizeProps( props ) ).toEqual( {
			...safeProps,
			rel: `${ Rel.noopener } ${ Rel.noreferrer }`,
		} );
	} );
} );
