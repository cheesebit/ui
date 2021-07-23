import generator from 'test/data-generator';

import { validateMinValue, validateMaxValue, validateRange } from './value';

describe( 'validators.number.value', () => {
	describe( 'Validate minimum value', () => {
		it( 'returns true', () => {
			expect( validateMinValue( generator.natural( { min: 2 } ), 2 ) ).toBe( true );
		} );
		it( 'returns false', () => {
			expect( validateMinValue( generator.word(), 10 ) ).toBe( false );
			expect( validateMinValue( NaN, 10 ) ).toBe( false );
			expect( validateMinValue( generator.natural( { max: 9 } ), 10 ) ).toBe( false );
		} );
	} );

	describe( 'Validate maximum value', () => {
		it( 'returns true', () => {
			expect( validateMaxValue( generator.natural( { max: 10 } ), 10 ) ).toBe( true );
		} );
		it( 'returns false', () => {
			expect( validateMaxValue( generator.word(), 9 ) ).toBe( false );
			expect( validateMaxValue( NaN, 9 ) ).toBe( false );
			expect( validateMaxValue( generator.natural( { min: 10 } ), 9 ) ).toBe( false );
		} );
	} );

	describe( 'Validate range value', () => {
		it( 'returns true', () => {
			expect( validateRange( 1, 1, 3 ) ).toBe( true );
			expect( validateRange( 2, 1, 3 ) ).toBe( true );
			expect( validateRange( 3, 1, 3 ) ).toBe( true );
		} );
		it( 'returns false', () => {
			expect( validateRange( generator.word(), 1, 3 ) ).toBe( false );
			expect( validateRange( NaN, 1, 3 ) ).toBe( false );

			expect( validateRange( generator.natural( { max: 0 } ), 1, 3 ) ).toBe( false );
			expect( validateRange(
				generator.natural( { min: 4 } ), 1, 4 ) ).toBe( false );
		} );
	} );
} );
