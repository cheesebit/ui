import generator from 'test/data-generator';

import { validateRequired } from './required';

describe( 'validators.required', () => {
	it( 'returns false', () => {
		expect( validateRequired( '' ) ).toBe( false );
		expect( validateRequired( '    ' ) ).toBe( false );
		expect( validateRequired( null ) ).toBe( false );
		expect( validateRequired( undefined ) ).toBe( false );
		expect( validateRequired( NaN ) ).toBe( false );
	} );

	it( 'returns true', () => {
		expect( validateRequired( `  ${ generator.word() }  ` ) ).toBe( true );
		expect( validateRequired( generator.word() ) ).toBe( true );
		expect( validateRequired( 0 ) ).toBe( true );
		expect( validateRequired( -0 ) ).toBe( true );
		expect( validateRequired( generator.natural() ) ).toBe( true );
		expect( validateRequired( [] ) ).toBe( true );
		expect( validateRequired( {} ) ).toBe( true );
	} );
} );
