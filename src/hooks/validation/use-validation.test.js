import { renderHook } from '@testing-library/react-hooks';
import useValidation from './use-validation';

jest.mock( './validator/' );
import * as validator from './validator/';

describe( 'useValidation', () => {
	it( 'initializes correctly if an empty schema is provided', () => {
		const { result } = renderHook( () => useValidation() );

		expect( typeof result.current.status ).toBe( 'object' );
		expect( result.current.status ).toEqual( {} );
		expect( typeof result.current.dispatch ).toBe( 'function' );
	} );

	it( 'initializes correctly if a non empty schema is provided', () => {
		const { result } = renderHook( () => useValidation( {} ) );

		expect( typeof result.current.status ).toBe( 'object' );
		expect( result.current.status ).toEqual( {} );
		expect( typeof result.current.dispatch ).toBe( 'function' );
	} );

	it( 'updates status when validate all fields is triggered', async () => {
		const expectedStatus = {
			name: true,
			email: false,
			type: [ 'validator-1', 'validator-2' ],
		};
		validator.validate.mockResolvedValue( expectedStatus );

		const { result, waitForNextUpdate } = renderHook( () =>
			useValidation( {
				name: [],
			} ),
		);

		expect( result.current.status ).toEqual( {} );

		result.current.dispatch( 'validate', {
			values: { name: 'John Doe' },
		} );

		await waitForNextUpdate();

		expect( result.current.status ).toEqual( expectedStatus );
	} );

	it( 'updates status when validate single field is triggered', async () => {
		const expectedStatus = {
			name: false,
		};
		validator.validate.mockResolvedValue( expectedStatus );

		const { result, waitForNextUpdate } = renderHook( () =>
			useValidation( {
				name: [],
				email: [],
				type: [],
			} ),
		);

		expect( result.current.status ).toEqual( {} );

		result.current.dispatch( 'field.validate', {
			id: 'name',
			values: { name: 'John Doe', email: 'john.doe@gmail.com', type: 'client' },
		} );

		await waitForNextUpdate();

		expect( result.current.status ).toEqual( expectedStatus );
	} );
} );
