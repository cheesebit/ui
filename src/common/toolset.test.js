import 'regenerator-runtime/runtime';

import { capitalize, identity, isPromise, isString, to } from './toolset';
import generator from '../../test/data-generator';

describe( 'Toolset', () => {
	describe( 'isString', () => {
		it( 'returns true for strings', () => {
			expect( isString( generator.word() ) ).toBe( true );
			expect( isString( '' ) ).toBe( true );
			expect( isString( '  ' ) ).toBe( true );
		} );

		it( 'returns false for null/undefined', () => {
			expect( isString( null ) ).toBe( false );
			expect( isString( undefined ) ).toBe( false );
		} );

		it( 'returns false for numbers', () => {
			expect( isString( generator.float() ) ).toBe( false );
			expect( isString( generator.natural() ) ).toBe( false );
			expect( isString( NaN ) ).toBe( false );
		} );

		it( 'returns false for objects/arrays/functions', () => {
			expect( isString( {} ) ).toBe( false );
			expect( isString( [] ) ).toBe( false );
			expect( isString( { a: 1 } ) ).toBe( false );
			expect( isString( [ 1, 2, 3, 4 ] ) ).toBe( false );

			expect( isString( () => {} ) ).toBe( false );
		} );
	} );

	describe( 'isPromise', () => {
		it( 'returns true for Promise', () => {
			expect( isPromise( new Promise( () => {} ) ) ).toBe( true );
		} );

		it( 'returns false for strings', () => {
			expect( isPromise( generator.word() ) ).toBe( false );
			expect( isPromise( '' ) ).toBe( false );
			expect( isPromise( '  ' ) ).toBe( false );
		} );

		it( 'returns false for null/undefined', () => {
			expect( isPromise( null ) ).toBe( false );
			expect( isPromise( undefined ) ).toBe( false );
		} );

		it( 'returns false for numbers', () => {
			expect( isPromise( generator.float() ) ).toBe( false );
			expect( isPromise( generator.natural() ) ).toBe( false );
			expect( isPromise( NaN ) ).toBe( false );
		} );

		it( 'returns false for objects/arrays/functions', () => {
			expect( isPromise( {} ) ).toBe( false );
			expect( isPromise( [] ) ).toBe( false );
			expect( isPromise( { a: 1 } ) ).toBe( false );
			expect( isPromise( [ 1, 2, 3, 4 ] ) ).toBe( false );

			expect( isPromise( () => {} ) ).toBe( false );
		} );
	} );

	describe( 'to', () => {
		it( 'returns [null, data] for fullfiled promises', async () => {
			const data = { [ generator.word() ]: generator.name() };

			function a() {
				return new Promise( ( resolve ) => {
					resolve( data );
				} );
			}

			expect( await to( a() ) ).toEqual( [ null, data ] );
		} );

		it( 'returns [err, void 0] for rejected promises', async () => {
			const err = { [ generator.word() ]: generator.name() };

			function a() {
				return new Promise( ( _, reject ) => {
					reject( err );
				} );
			}

			expect( await to( a() ) ).toEqual( [ err, undefined ] );
		} );
	} );

	describe( 'identity', () => {
		it( 'returns same strings', () => {
			const val = generator.word();
			expect( identity( val ) ).toBe( val );
		} );

		it( 'returns same number', () => {
			const val = generator.natural();
			expect( identity( val ) ).toBe( val );
		} );

		it( 'returns same object/array/function', () => {
			const val = { a: 1 };
			expect( identity( val ) ).toBe( val );
		} );
	} );

	describe( 'capitalize', () => {
		it( 'returns empty string for null/undefined/empty strings', () => {
			expect( capitalize( null ) ).toBe( '' );
			expect( capitalize( undefined ) ).toBe( '' );
			expect( capitalize( '   ' ) ).toBe( '' );
			expect( capitalize( '' ) ).toBe( '' );
		} );

		it( 'returns capitalized strings', () => {
			expect( capitalize( 'abcde' ) ).toBe( 'Abcde' );
		} );
	} );
} );
