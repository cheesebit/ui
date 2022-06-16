import {
	validateMinLength,
	validateMaxLength,
	validateRangeLength,
	validateLength,
} from './length';
import generator from 'test/data-generator';

describe( 'validators.string.length', () => {
	describe( 'Validate minimum length', () => {
		it( 'returns true', () => {
			expect( validateMinLength( '', 0 ) ).toBe( true );
			expect( validateMinLength( '     ', 0 ) ).toBe( true );
			expect(
				validateMinLength( ` ${ generator.word( { length: 5 } ) } `, 5 )
			).toBe( true );
			expect(
				validateMinLength( generator.word( { length: 5 } ), 5 )
			).toBe( true );
		} );

		it( 'returns false', () => {
			expect( validateMinLength( '', 1 ) ).toBe( false );
			expect( validateMinLength( '     ', 1 ) ).toBe( false );
			expect(
				validateMinLength( generator.word( { length: 1 } ), 2 )
			).toBe( false );
			expect(
				validateMinLength( ` ${ generator.word( { length: 1 } ) } `, 2 )
			).toBe( false );
		} );
	} );

	describe( 'Validate maximum length', () => {
		it( 'returns true', () => {
			expect( validateMaxLength( '', 0 ) ).toBe( true );
			expect( validateMaxLength( '     ', 0 ) ).toBe( true );
			expect(
				validateMaxLength( ` ${ generator.word( { length: 5 } ) } `, 5 )
			).toBe( true );
			expect(
				validateMaxLength( generator.word( { length: 5 } ), 5 )
			).toBe( true );
		} );

		it( 'returns false', () => {
			expect(
				validateMaxLength( generator.word( { length: 3 } ), 2 )
			).toBe( false );
			expect(
				validateMaxLength(
					`  ${ generator.word( { length: 3 } ) }  `,
					2
				)
			).toBe( false );
		} );
	} );

	describe( 'Validate length range', () => {
		it( 'returns true', () => {
			expect(
				validateRangeLength( generator.word( { length: 3 } ), 2, 5 )
			).toBe( true );
			expect(
				validateRangeLength(
					`  ${ generator.word( { length: 3 } ) }  `,
					2,
					5
				)
			).toBe( true );
		} );

		it( 'returns false', () => {
			expect(
				validateRangeLength( generator.word( { length: 3 } ), 5, 8 )
			).toBe( false );
			expect(
				validateRangeLength(
					`  ${ generator.word( { length: 3 } ) }  `,
					5,
					8
				)
			).toBe( false );
		} );
	} );

	describe( 'Validate exact length', () => {
		it( 'returns true', () => {
			expect( validateLength( generator.word( { length: 3 } ), 3 ) ).toBe(
				true
			);
			expect(
				validateLength( `  ${ generator.word( { length: 3 } ) }  `, 3 )
			).toBe( true );
		} );

		it( 'returns false', () => {
			expect( validateLength( generator.word( { length: 2 } ), 3 ) ).toBe(
				false
			);
			expect( validateLength( generator.word( { length: 4 } ), 3 ) ).toBe(
				false
			);

			expect(
				validateLength(
					`  ${ generator.word( { length: 3 } ) }  `,
					3 + 4
				)
			).toBe( false );
		} );
	} );
} );
