import { validatePermissive } from './permissive';

describe( 'validators.permissive', () => {
	it( 'should always return true', () => {
		expect( validatePermissive() ).toBe( true );
	} );
} );
