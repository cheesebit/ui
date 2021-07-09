import generator from 'test/data-generator';

import { each, keys } from 'common/toolset';
import { validate, validators, getStatus, getValue, getValidator } from './validator';

describe( 'validator', () => {
	describe( 'getStatus', () => {
		// the `false` means an array with the name of the validators that failed
		it( 'returns true when previous status is true and current status is true', () => {
			expect( getStatus( true, true, 'validator-name' ) ).toBe( true );
		} );

		it( 'returns an array with the validator name when previous status is true and current status is false', () => {
			expect( getStatus( true, false, 'validator-name' ) ).toEqual( [ 'validator-name' ] );
		} );

		it( 'returns an array with the validator name when previous status is false and current status is true', () => {
			expect( getStatus( [ 'validator-name-1' ], true, 'validator-name-2' ) ).toEqual( [
				'validator-name-1',
			] );
		} );

		it( 'returns an array with the validator names when previous status is false and current status is false', () => {
			expect( getStatus( [ 'validator-name-1' ], false, 'validator-name-2' ) ).toEqual( [
				'validator-name-1',
				'validator-name-2',
			] );
		} );
	} );

	describe( 'getValue', () => {
		const values = {
			name: generator.name(),
			email: generator.email(),
			type: null,
		};

		it( 'returns empty `values` if is a falsy `values` is provided', () => {
			expect( getValue( null, 'name', true ) ).toEqual( {} );
			expect( getValue( undefined, 'name', true ) ).toEqual( {} );
		} );

		it( 'returns `values` if a custom validator (handler) is provided', () => {
			expect( getValue( values, 'name', true ) ).toEqual( values );
		} );

		it( 'returns specific field value if a predefined validator (handler) is provided', () => {
			expect( getValue( values, 'name', false ) ).toBe( values.name );
			expect( getValue( values, 'email', false ) ).toBe( values.email );
			expect( getValue( values, 'type', false ) ).toBeNull();
			expect( getValue( values, 'age', false ) ).toBeUndefined();
		} );
	} );

	describe( 'getValidator', () => {
		it( 'returns a predefined validator if the given rule name matches an existing validator', () => {
			each( ( ruleName ) => {
				expect( getValidator( ruleName ) ).toEqual( validators[ ruleName ] );
			}, keys( validators ) );
		} );

		it( 'returns a permissive validator (always returns true) if the given rule name does not match an existing validator', () => {
			const ruleName = generator.word();

			expect( getValidator( ruleName ) ).toEqual( validators.permissive );
		} );
	} );

	describe( 'validate', () => {
		it( 'throws an error if schema is missing', async () => {
			await expect( validate( {} ) ).rejects.toThrowError( 'Schema is required' );
		} );

		it( 'returns status true for all fields if schema is empty', async () => {
			expect( await validate( { name: 'John Doe', email: 'john@doe.com' }, {} ) ).toEqual( {
				name: true,
				email: true,
			} );
		} );

		it( 'returns status true for fields that have an empty array of validator', async () => {
			expect(
				await validate(
					{ name: 'John Doe', email: 'john@doe.com' },
					{
						name: [],
						email: [],
					},
				),
			).toEqual( {
				name: true,
				email: true,
			} );
		} );
	} );
} );
